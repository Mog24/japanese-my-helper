module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
    ],
    overrides: [
      {
        test: /@?(ui-kitten|eva-design).*\.(ts|js)x?$/,
        presets: ["babel-preset-expo"],
      },
    ],
  };
};
