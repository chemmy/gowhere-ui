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
  return goWhereApiInstance.get<TrafficImage[]>("/traffic", {
    params: { datetime },
  });
};

const getWeatherForecast = async (
  datetime: string,
  location: TrafficImage | null
): Promise<AxiosResponse<WeatherForecast> | null> => {
  if (!location) return null;

  const { latitude, longitude, name } = location;

  return await goWhereApiInstance.get<WeatherForecast>("/weather", {
    params: { datetime, latitude, longitude, location: name },
  });
};

export const gowhereApi = {
  getTrafficImages,
  getWeatherForecast,
};
