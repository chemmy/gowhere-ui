import { Card, Row } from "antd";
import { weatherIcons } from "../common/constants/weather";
import { WiCloud } from "weather-icons-react";
import { WeatherIconLegendPopover } from "./WeatherIconLegendPopover";
import { ReactElement } from "react";

type WeatherForecastCardProps = {
  locationForecast?: {
    name: string;
    forecast: string;
  };
};

export const WeatherForecastCard = ({
  locationForecast,
}: WeatherForecastCardProps): ReactElement | null => {
  if (!locationForecast) return null;

  const { name, forecast } = locationForecast;
  const WeatherIconComponent = weatherIcons[forecast] || WiCloud;

  return (
    <Card
      size="small"
      title="weather forecast"
      extra={<WeatherIconLegendPopover />}
    >
      <Row justify="center" align="middle">
        <WeatherIconComponent size={150} />
      </Row>
      <Card.Meta title={forecast} description={name} />
    </Card>
  );
};
