import axios, { AxiosResponse } from "axios";
import config from "../../config";

const gowhereApiInstance = axios.create({
  baseURL: config.gowhereApi,
  headers: {
    "Content-Type": "application/json",
  },
});

const getTrafficImages = (
  datetime: string,
): Promise<AxiosResponse<Array<TrafficImageType>>> => {
  return gowhereApiInstance.get<Array<TrafficImageType>>("/locations/traffic", {
    params: { datetime },
  });
};

const getWeatherForecast = async (
  datetime: string,
  location: TrafficImageType | null,
): Promise<AxiosResponse<WeatherForecastType> | null> => {
  if (!location) return null;

  const { latitude, longitude, name } = location;
  const params = { datetime, latitude, longitude, location: name };

  return await gowhereApiInstance.get<WeatherForecastType>(
    "/locations/weather",
    { params },
  );
};

const getMostRecentSearches = async (): Promise<Array<RecentSearchesType>> => {
  const recentSearches = await gowhereApiInstance.get<
    Array<GowhereLogResponseType>
  >("/reports/recent-location-searches");
  const { data } = recentSearches;
  return data?.map((item) => ({
    id: item.id?.toString(),
    name: item.search_location,
  }));
};

export const gowhereApi = {
  getTrafficImages,
  getWeatherForecast,
  getMostRecentSearches,
};
