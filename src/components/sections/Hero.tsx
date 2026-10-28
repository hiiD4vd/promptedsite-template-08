import { mediaUrl } from '../../lib/media';

export function Hero() {
  return (
    <section className="pwb-flex-grid-wrap" id="i84ba">
      <div className="pwb-flex-grid-wrap" id="i1lwz">
        <div className="pwb-flex-grid-wrap" id="i1lwz-2">
          <h1
            className="pw-user-text-style-6ae56f11-b178-4dd1-8bf0-1f16cb6f2a2e"
            id="ispyh-2-2"
          >
            {"Elevate your portofolio with "}
            <br id="ibpex9" />
            {"Promptedsite."}
          </h1>
          <div className="pw-block-style" id="i81y03-2">
            <p
              className="pw-user-text-style-3045d4e5-cceb-462e-a2d3-aff6a744df83"
              id="ispyh-2-3-4"
            >
              {"Trusted by 10k+ creators"}
            </p>
            <div className="pw-block-style" id="izwg2d">
              <img
                className="pw-image-style"
                id="imj1ks"
                loading="lazy"
                src={mediaUrl("images/avatar-1.png")}
                alt=""
              />
              <img
                className="pw-image-style"
                id="isb55j"
                loading="lazy"
                src={mediaUrl("images/avatar-2.png")}
                alt=""
              />
              <img
                className="pw-image-style"
                id="ik1frl"
                loading="lazy"
                src={mediaUrl("images/avatar-3.png")}
                alt=""
              />
              <img
                className="pw-image-style"
                id="iquqem"
                loading="lazy"
                src={mediaUrl("images/avatar-4.png")}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="pwb-flex-grid-wrap" id="i1lwz-2-2">
          <p
            className="pw-user-text-style-3045d4e5-cceb-462e-a2d3-aff6a744df83"
            id="ispyh-2-3"
          >
            {
              "Discover how our AI-driven strategies transform your marketing, delivering unparalleled results and efficiency."
            }
          </p>
          <div className="pw-block-style" id="i81y03">
            <div className="pwb-flex-grid-wrap" id="i1lwz-2-2-2-2-2-2-4">
              <p
                className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                id="ispyh-2-3-2-2-2-2-4"
              >
                {"Get Started"}
              </p>
              <img
                className="pw-image-style"
                id="i9hq34-2-2-3-2-2-2-4"
                loading="lazy"
                src={mediaUrl("icons/arrow-white.svg")}
                alt=""
              />
            </div>
            <div className="pwb-flex-grid-wrap" id="i1lwz-2-2-2-5">
              <p
                className="pw-user-text-style-db4943d4-453d-474d-b88a-07d9ad351c62"
                id="ispyh-2-3-2-6"
              >
                {"Discover More"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
