import { ReactElement, useEffect, useState } from "react";
import { Form, DatePicker, TimePicker, Button } from "antd";
import { useQuery } from "@tanstack/react-query";

import type { Dayjs } from "dayjs";

import { gowhereApi } from "../../services/gowhere/api";
import TrafficCamera from "../../components/TrafficCamera/TrafficCamera";
import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";
import LocationsList from "../../components/LocationsList/LocationsList";
import { validation } from "../../common/constants/forms";

import "./style.less";

type LocationFormType = {
  date: Dayjs;
  time: Dayjs;
};

const LocationTrafficAndWeather = (): ReactElement => {
  const [form] = Form.useForm();

  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<TrafficImage | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);

  const {
    data: trafficData,
    isLoading: isTrafficQueryLoading,
    error: trafficError,
  } = useQuery({
    queryKey: ["traffic-images", date],
    queryFn: () => gowhereApi.getTrafficImages(date),
    enabled: !!date,
    select: ({ data }) => data,
  });

  const {
    data: weatherData,
    isLoading: isWeatherQueryLoading,
    error: weatherError,
  } = useQuery({
    queryKey: ["weather-forecast", date, location],
    queryFn: () => gowhereApi.getWeatherForecast(date, location),
    enabled: !!location && !!date,
    select: (response) => response?.data,
  });

  const onFinish = (value: LocationFormType) => {
    const { time } = value;
    const combinedDateTime = value.date
      .set("hour", time.hour())
      .set("minute", time.minute())
      .set("second", time.second());

    setLocation(null);
    setLocationId(null);
    setDate(combinedDateTime.toISOString());
  };

  useEffect(() => {
    if (!trafficData) return;

    const record = trafficData.find((traffic) => traffic.id === locationId);

    if (!record) {
      setLocation(null);
      return;
    }

    setLocation(record);
  }, [trafficData, locationId]);

  const onLocationChange = (value: string) => {
    setLocationId(value);
  };

  return (
    <div className="location-traffic-weather">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="date" label="Date" rules={[validation.required]}>
          <DatePicker placeholder="Select date" />
        </Form.Item>
        <Form.Item name="time" label="Time" rules={[validation.required]}>
          <TimePicker placeholder="Select Time" format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isTrafficQueryLoading}
          >
            Search
          </Button>
        </Form.Item>
      </Form>

      <div className="locations-info">
        <div className="location-main">
          <LocationsList
            locationId={locationId}
            onLocationChange={onLocationChange}
            trafficData={trafficData}
            error={trafficError}
          />

          <div className="forecast">
            <WeatherForecast
              locationForecast={weatherData}
              isLoading={isWeatherQueryLoading}
              error={weatherError}
            />
          </div>
        </div>

        <div className="traffic-image">
          <TrafficCamera location={location} />
        </div>
      </div>
    </div>
  );
};

export default LocationTrafficAndWeather;
