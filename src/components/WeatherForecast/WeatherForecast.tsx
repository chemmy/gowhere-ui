import { WiCloud } from "weather-icons-react";
import { ReactElement } from "react";
import { Spin } from "antd";

import { weatherIcons } from "@common/constants/weather";
import WeatherIconLegendPopover from "@components/WeatherIconLegendPopover/WeatherIconLegendPopover";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import "./style.less";

type WeatherForecastPropsType = {
  locationForecast?: {
    forecast: string;
  };
  isLoading: boolean;
  error: Error | null | string;
};

const WeatherForecast = ({
  locationForecast,
  isLoading,
  error,
}: WeatherForecastPropsType): ReactElement | null => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) return <Spin />;

  const { forecast } = locationForecast || {};
  if (!forecast) return null;

  const WeatherIconComponent = weatherIcons[forecast] || WiCloud;

  return (
    <div className="weather-forecast">
      <div className="label">
        <label>Weather Forecast</label>
        <WeatherIconLegendPopover />
      </div>
      <div className="details">
        <WeatherIconComponent size={40} />
        <p>{forecast}</p>
      </div>
    </div>
  );
};

export default WeatherForecast;
