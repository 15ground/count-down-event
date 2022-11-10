const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@config": path.resolve(__dirname, "src/config"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
};
