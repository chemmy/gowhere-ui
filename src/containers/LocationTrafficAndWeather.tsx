import { ReactElement, useEffect, useState } from "react";
import { Form, DatePicker, TimePicker, Button, Select } from "antd";
import { useQuery } from "@tanstack/react-query";

import type { Dayjs } from "dayjs";

import { gowhereApi } from "../services/gowhere/api";
import TrafficCamera from "../components/TrafficCamera";
import { WeatherForecastCard } from "../components/WeatherForecastCard";

const LocationTrafficAndWeather = (): ReactElement => {
  const [form] = Form.useForm();

  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<TrafficImage | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);

  // TODO: Stop rerender on locationId change?
  console.log({ date, locationId });

  // TODO: move types
  type LocationFormType = {
    date: Dayjs;
    time: Dayjs;
  };

  // WEATHER --------------------------------------------
  const weatherForecastQuery = useQuery({
    queryKey: ["weather-forecast", date, location],
    queryFn: () => gowhereApi.getWeatherForecast(date, location),
    enabled: !!location && !!date,
    select: (response) => response?.data,
  });

  // TRAFFIC --------------------------------------------

  // Handle multiple failed calls
  // useTags hooks for reusability
  const trafficImagesQuery = useQuery({
    queryKey: ["traffic-images", date],
    queryFn: () => gowhereApi.getTrafficImages(date),
    enabled: !!date,
    select: ({ data }) => data,
  });

  console.log(trafficImagesQuery);

  const onFinish = (value: LocationFormType) => {
    const combinedDateTime = value.date
      .set("hour", value.time.hour())
      .set("minute", value.time.minute())
      .set("second", value.time.second());

    setLocationId(null);
    setDate(combinedDateTime.toISOString());
  };

  useEffect(() => {
    if (!trafficImagesQuery.data) return;

    const record = trafficImagesQuery.data.find((d) => d.id === locationId);

    if (!record) {
      // @TODO Handle locationId not found
      return;
    }

    setLocation(record);
  }, [trafficImagesQuery.data, locationId]);

  // LOCATION -----------------------------------------

  const getLocationOptions = () => {
    if (!trafficImagesQuery.data) return [];

    return trafficImagesQuery.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  // RENDER

  return (
    <div className="location-traffic-weather">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="date" label="Date" required>
          <DatePicker placeholder="Select date" />
        </Form.Item>
        <Form.Item name="time" label="Time" required>
          <TimePicker placeholder="Select Time" format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <div className="locations-info">
        <div className="location-main">
          {trafficImagesQuery.data ? (
            <Select
              value={locationId}
              options={getLocationOptions()}
              onChange={setLocationId}
              style={{ width: 200 }}
            />
          ) : null}

          <div className="weather-forecast">
            {/* Add loading here */}
            <WeatherForecastCard
              locationForecast={weatherForecastQuery?.data}
            />
          </div>
        </div>
        <div className="traffic-camera">
          <TrafficCamera location={location} />
        </div>
      </div>
    </div>
  );
};

export default LocationTrafficAndWeather;
