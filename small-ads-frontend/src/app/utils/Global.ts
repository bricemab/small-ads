import axios from "axios";
import Config from "../config/config";
export const BASE_URL = Config.backendEndPoint;
export default {
  instanceAxios: axios.create({
    baseURL: BASE_URL,
  })
};
