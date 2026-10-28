import manifest from '../config/assets.json';

const configuredBase = import.meta.env.VITE_ASSET_BASE?.replace(/\/$/, '');

export function mediaUrl(key: string) {
  const file = manifest.files[key as keyof typeof manifest.files];
  if (!file) throw new Error(`Unknown media asset: ${key}`);
  return `${configuredBase || manifest.baseUrl}/${key}?v=${manifest.release}`;
}

export function decoderBase() {
  return `${configuredBase || manifest.baseUrl}/decoders/`;
}

export function sceneAssetUrl(source: string) {
  if (source.includes('coin-single-angled-v2')) return mediaUrl('models/coin-angled-v2.glb');
  if (source.includes('coin-single-angled-v3')) return mediaUrl('models/coin-angled-v3.glb');
  throw new Error(`Unknown scene asset: ${source}`);
}
