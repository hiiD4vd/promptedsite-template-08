const manifest = require("../src/config/assets.json");
module.exports = () => ({
  postcssPlugin: "template-assets",
  Declaration(declaration) {
    if (!declaration.value.includes("asset:")) return;
    const base = (process.env.VITE_ASSET_BASE || manifest.baseUrl).replace(
      /\/$/,
      "",
    );
    declaration.value = declaration.value.replace(
      /asset:([a-zA-Z0-9_./-]+)/g,
      (_, key) => {
        if (!manifest.files[key])
          throw declaration.error("Unknown media asset: " + key);
        return base + "/" + key;
      },
    );
  },
});
module.exports.postcss = true;
