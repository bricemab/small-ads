const config = {
  env: "development",
  isDevModeEnabled: true,
  hasExchangeFeatures: true,
  axiosRequestsTimeout: 5000,
  backendEndPoint: "http://localhost:3000",
  backendSecretKey:
    "brice",
  hmacSecretPacketKey:
    "brice2",
  dataSecretKey:
    "briceData",
}
config.isDevModeEnabled = config.env === "development";

export default config;
