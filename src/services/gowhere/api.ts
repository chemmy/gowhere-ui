import axios, { AxiosResponse } from "axios";
import config from "../../config";

const goWhereApiInstance = axios.create({
  baseURL: config.gowhereApi,
  headers: {
    "Content-Type": "application/json",
  },
});

const getTrafficImages = (
  datetime: string
): Promise<AxiosResponse<TrafficImage[]>> => {
  return goWhereApiInstance.get("/traffic", {
    params: { datetime },
  });
};

export const gowhereApi = {
  getTrafficImages,
};
