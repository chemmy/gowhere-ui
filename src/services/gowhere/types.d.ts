type TrafficImageType = {
  id: string;
  image?: string;
  latitude: number;
  longitude: number;
  name: string;
};

type WeatherForecastType = {
  name: string;
  forecast: string;
};

type RecentSearchesType = {
  id: string;
  name: string;
};

type GowhereLogResponseType = {
  id: number;
  search_location: string;
};

type ApiErrorResponseType = {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
};
