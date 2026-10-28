import { MenuToggle } from "../MenuToggle";
import { mediaUrl } from '../../lib/media';
export function Header() {
  return (
    <header className="pwb-flex-grid-wrap" id="ihkww7">
      <div className="pw-block-style" id="int5ct">
        <div className="pwb-flex-grid-wrap" id="i1lwz-3">
          <div className="pwb-flex-grid-wrap" id="i1lwz-2-3">
            <div id="ispyh-2-3-2-3-3-2">{"Promptedsite Agency"}</div>
          </div>
          <div className="framer-1cc0f02" id="imob0j-3-3-2">
            <div className="pwb-flex-grid-wrap" id="i1lwz-2-3-3-2">
              <a
                className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                id="ispyh-2-3-2-3-2-2-2"
                href="#ilwyn"
              >
                {"Services"}
              </a>
              <a
                className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                id="ispyh-2-3-2-3-2-2-2-2"
                href="#ilwyn-2-2-3"
              >
                {"Features"}
              </a>
              <a
                className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                id="ispyh-2-3-2-3-2-2-2-2-2"
                href="#ilwyn-2-2-4"
              >
                {"Portfolio"}
              </a>
              <a
                className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                id="ispyh-2-3-2-3-2-2-2-2-2-2"
                href="#ilwyn-2-2-2-3"
              >
                {"Pricing"}
              </a>
              <div className="pwb-flex-grid-wrap" id="i1lwz-2-2-2-2-2-2">
                <p
                  className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                  id="ispyh-2-3-2-2-2-2"
                >
                  {"Get Started"}
                </p>
                <img
                  className="pw-image-style"
                  id="i9hq34-2-2-3-2-2-2"
                  loading="lazy"
                  src={mediaUrl("icons/arrow-white.svg")}
                  alt=""
                />
              </div>
            </div>
          </div>
          <MenuToggle />
        </div>
      </div>
    </header>
  );
}
