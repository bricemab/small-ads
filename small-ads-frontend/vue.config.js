module.exports = {
  productionSourceMap: false,
  transpileDependencies: ["vuex-persist"],
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/variables.scss";`,
      },
    },
  },
};
