"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { scrollTimeline } from './scrollTimeline';
import uiState from '../config/ui-state.json';
import { decoderBase, mediaUrl, sceneAssetUrl } from '../lib/media';
type Vector = { x: number; y: number; z: number };
interface SceneObject {
  uuid: string;
  type: string;
  position: Vector;
  rotation: Vector;
  scale: Vector;
  visible: boolean;
  fov?: number;
  zoom?: number;
  color?: string;
  intensity?: number;
  object?: { assetUrl: string };
}
interface Keyframe {
  position: number;
  value: number;
}
interface Track {
  trackIdByPropPath: Record<string, string>;
  trackData: Record<string, { keyframes: { byId: Record<string, Keyframe> } }>;
}
interface SceneData {
  animations: {
    sheetsById: Record<
      string,
      { sequence: { tracksByObject: Record<string, Track> } }
    >;
  };
  engineState: {
    sceneObjectId: string;
    pwObjects: Record<string, SceneObject>;
    parents: Record<string, string>;
  };
}
// Explicit adapter for the authorized exported scene; no legacy DOM runtime.
export function SceneBackground() {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const element = host.current!;
    const abort = new AbortController();
    let disposed = false;
    let frame = 0;
    let renderer: THREE.WebGLRenderer | undefined;
    const scene = new THREE.Scene();
    const draco = new DRACOLoader().setDecoderPath(decoderBase());
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const observer = new ResizeObserver(() => render());
    let camera: THREE.PerspectiveCamera | undefined;
    let animateScene = () => {};
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const render = () => {
      if (!renderer || !camera || disposed) return;
      animateScene();
      const width = element.clientWidth;
      const height = element.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.zoom = width < 768 ? 0.7 : 1;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };
    async function setup() {
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        element.appendChild(renderer.domElement);
        const response = await fetch(
          mediaUrl('scene/agency-scene.json'),
          { signal: abort.signal },
        );
        if (!response.ok) throw Error("Scene unavailable");
        const data: SceneData = await response.json();
        if (disposed) return;
        const objects = new Map<string, THREE.Object3D>();
        objects.set(data.engineState.sceneObjectId, scene);
        const loader = new GLTFLoader().setDRACOLoader(draco);
        const glass = new THREE.MeshPhysicalMaterial({
          color: "#ffd6b2",
          roughness: 0,
          transmission: 1,
          thickness: 4,
          ior: 1.5,
          clearcoat: 0.4368,
          side: THREE.DoubleSide,
        });
        materials.add(glass);
        const textureLoader = new THREE.TextureLoader();
        const env = await textureLoader.loadAsync(
          mediaUrl('textures/environment.jpg'),
        );
        textures.add(env);
        if (disposed) {
          env.dispose();
          return;
        }
        env.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = env;
        const gradient = await textureLoader.loadAsync(
          mediaUrl('textures/gradient-bg.jpg'),
        );
        textures.add(gradient);
        if (disposed) {
          gradient.dispose();
          return;
        }
        const cache = new Map<string, THREE.Group>();
        for (const item of Object.values(data.engineState.pwObjects)) {
          if (disposed) return;
          if (item.type === "SCENE") continue;
          let object: THREE.Object3D = new THREE.Group();
          if (item.type === "CAMERA")
            object = new THREE.PerspectiveCamera(item.fov || 30, 1, 0.1, 1000);
          if (item.type === "LIGHT")
            object = new THREE.DirectionalLight(item.color, item.intensity);
          if (item.type === "MESH") {
            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
              map: gradient,
              color: "#ff8a50",
            });
            geometries.add(geometry);
            materials.add(material);
            object = new THREE.Mesh(geometry, material);
          }
          if (item.object?.assetUrl) {
            let original = cache.get(item.object.assetUrl);
            if (!original) {
              original = (await loader.loadAsync(sceneAssetUrl(item.object.assetUrl))).scene;
              original.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  geometries.add(child.geometry);
                  const old = Array.isArray(child.material)
                    ? child.material
                    : [child.material];
                  old.forEach((m) => materials.add(m));
                  child.material = glass;
                }
              });
              cache.set(item.object.assetUrl, original);
            }
            if (disposed) {
              geometries.forEach((g) => g.dispose());
              materials.forEach((m) => m.dispose());
              return;
            }
            object = original.clone(true);
          }
          object.position.set(
            item.position.x,
            item.position.y,
            item.position.z,
          );
          object.rotation.set(
            item.rotation.x,
            item.rotation.y,
            item.rotation.z,
          );
          object.scale.set(item.scale.x, item.scale.y, item.scale.z);
          object.visible = item.visible;
          objects.set(item.uuid, object);
        }
        for (const [id, parent] of Object.entries(data.engineState.parents))
          if (objects.has(id))
            (objects.get(parent) || scene).add(objects.get(id)!);
        camera = objects.get(
          "d1fb8215-f58d-4a0f-835b-c6d839185756",
        ) as THREE.PerspectiveCamera;
        const tracks =
          data.animations.sheetsById.DEFAULT_ANIMATION_SHEET_NAME.sequence
            .tracksByObject;
        animateScene = () => {
          const anchors = Object.entries(uiState.anchors).flatMap(([id, anchor]) => {
            const target=document.getElementById(id);
            return target ? [{position:target.getBoundingClientRect().top+window.scrollY,percentage:anchor.percentage}] : [];
          });
          const progress = scrollTimeline(window.scrollY,innerHeight,document.documentElement.scrollHeight,anchors);
          element.dataset.timelineProgress=String(progress);
          for (const [id, track] of Object.entries(tracks)) {
            const object = objects.get(id);
            if (!object) continue;
            for (const [path, trackId] of Object.entries(
              track.trackIdByPropPath,
            )) {
              const [property, axis] = JSON.parse(path) as string[];
              if (
                !["position", "rotation", "scale"].includes(property) ||
                !["x", "y", "z"].includes(axis)
              )
                continue;
              const keys = Object.values(
                track.trackData[trackId]?.keyframes?.byId || {},
              ).sort((a, b) => a.position - b.position);
              if (!keys.length) continue;
              const right =
                keys.find((k) => k.position >= progress) ||
                keys[keys.length - 1];
              const left =
                [...keys].reverse().find((k) => k.position <= progress) ||
                keys[0];
              const ratio =
                left === right
                  ? 0
                  : (progress - left.position) /
                    (right.position - left.position);
              (object[property as "position" | "scale" | "rotation"] as Vector)[
                axis as keyof Vector
              ] = left.value + (right.value - left.value) * ratio;
            }
          }
        };
        scene.add(new THREE.AmbientLight("#ffffff", 2));
        observer.observe(element);
        window.addEventListener("scroll", onScroll, { passive: true });
        motion.addEventListener("change", render);
        render();
        setStatus("ready");
      } catch (error) {
        if (!disposed) {
          console.error("Scene loading failed", error);
          setStatus("error");
        }
      }
    }
    void setup();
    return () => {
      disposed = true;
      abort.abort();
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", render);
      draco.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };
  }, []);
  return (
    <div
      id="ip1j"
      className="pwb-background pwb-flex-grid-wrap"
      aria-hidden="true"
    >
      <div
        ref={host}
        id="ijsk"
        className="pwb-scene scene-fallback"
        data-scene-status={status}
      />
    </div>
  );
}
