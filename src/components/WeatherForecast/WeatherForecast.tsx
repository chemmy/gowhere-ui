import { weatherIcons } from "../../common/constants/weather";
import { WiCloud } from "weather-icons-react";
import { ReactElement } from "react";

import WeatherIconLegendPopover from "../WeatherIconLegendPopover";

import "./style.less";

type WeatherForecastProps = {
  locationForecast?: {
    forecast: string;
  };
};

const WeatherForecast = ({
  locationForecast,
}: WeatherForecastProps): ReactElement | null => {
  const { forecast } = locationForecast || {};
  if (!forecast) return null;

  const WeatherIconComponent = weatherIcons[forecast] || WiCloud;

  return (
    <div className="weather-forecast">
      <div className="details">
        <WeatherIconComponent size={40} />
        <p>{forecast}</p>
      </div>
      <WeatherIconLegendPopover />
    </div>
  );
};

export default WeatherForecast;
