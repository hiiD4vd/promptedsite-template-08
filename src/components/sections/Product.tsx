import { mediaUrl } from '../../lib/media';

export function Product() {
  return (
    <section className="pwb-flex-grid-wrap" id="ilwyn">
      <div className="pwb-flex-grid-wrap" id="i1lwz-2-4">
        <div className="pw-block-style" id="ipgqtg">
          <div className="pw-block-style" id="iklwi7">
            <div className="pw-block-style" id="iyg80u">
              <h4
                className="pw-user-text-style-47248e95-3515-4423-8189-0bbe15d8728f"
                id="ispyh-2-3-2-3-2-2-2-3"
              >
                {"SOLUTIONS"}
              </h4>
              <h2
                className="pw-user-text-style-9711fa5c-ea00-4752-8af0-945c28ef776e"
                id="ispyh-2-2-2"
              >
                {"Streamline complex marketing tasks."}
              </h2>
              <div className="pw-block-style" id="i81y03-3">
                <div className="pwb-flex-grid-wrap" id="i1lwz-2-2-2-6">
                  <p
                    className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                    id="ispyh-2-3-2-7"
                  >
                    {"Get Started"}
                  </p>
                  <img
                    className="pw-image-style"
                    id="i9hq34-3"
                    loading="lazy"
                    src={mediaUrl("icons/arrow-right.svg")}
                    alt=""
                  />
                </div>
                <div className="pwb-flex-grid-wrap" id="i1lwz-2-2-2-5-2">
                  <p
                    className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                    id="ispyh-2-3-2-6-2"
                  >
                    {"View Demo"}
                  </p>
                </div>
              </div>
            </div>
            <div className="pw-block-style" id="iyg80u-2">
              <p
                className="pw-user-text-style-3045d4e5-cceb-462e-a2d3-aff6a744df83"
                id="ispyh-2-3-5"
              >
                {
                  "Automate routine marketing tasks, freeing up your team to focus on strategy and creativity, boosting overall output."
                }
              </p>
            </div>
          </div>
          <div className="pw-block-style" id="ijuu9f">
            <img
              className="pw-image-style"
              id="i0esdr"
              loading="lazy"
              src={mediaUrl("images/dashboard.png")}
              alt="Marketing dashboard preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
