const config = {
    env: "development",
    isDevModeEnabled: true,
    hasExchangeFeatures: true,
    axiosRequestsTimeout: 5000,
    // backendApiEndPoint: "https://api.myshk.ch/",
    backendApiEndPoint: "http://192.168.250.106:8081/",
    backendSecretKey: "X5tdt2VxFLLJ74HZx3ad93Fgn3nLhTepzUZh4Wu7wdPej742fUXrTbvCqRNH7BzKk4g6PnPV2Nzc53SFkWpwtZWHDvBVSu3HYmc9",
    hmacSecretPacketKey: "asdf",
};
config.isDevModeEnabled = config.env === "development";
// process.env.NODE_ENV = config.env;
export default config;
//# sourceMappingURL=config.js.map