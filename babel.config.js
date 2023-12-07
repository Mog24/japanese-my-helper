module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      {
        test: /@?(ui-kitten|eva-design).*\.(ts|js)x?$/,
        loader: "babel-loader",
      },
    ],
  };
};
