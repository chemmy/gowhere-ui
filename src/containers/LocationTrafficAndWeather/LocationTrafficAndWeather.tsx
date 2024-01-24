import { ReactElement, useEffect, useState } from "react";
import { Form, DatePicker, TimePicker, Button, message } from "antd";
import { useQuery } from "@tanstack/react-query";

import type { Dayjs } from "dayjs";

import { gowhereApi } from "../../services/gowhere/api";
import TrafficCamera from "../../components/TrafficCamera/TrafficCamera";
import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";
import LocationsList from "../../components/LocationsList/LocationsList";
import { validation } from "../../common/constants/forms";

import "./style.less";
import {
  LOCAL_STORAGE_KEYS,
  localStorageHelper,
} from "../../common/helpers/localStorage";
import RecentSearches from "../../components/RecentSearches/RecentSearches";

type LocationFormType = {
  date: Dayjs;
  time: Dayjs;
};

const LocationTrafficAndWeather = (): ReactElement => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<TrafficImage | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);

  const { RECENT_SEARCHES } = LOCAL_STORAGE_KEYS;
  const recentSearches =
    localStorageHelper.getItem<TrafficImage[]>(RECENT_SEARCHES) || [];

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

  const updateSearchHistory = (location: TrafficImage) => {
    const LIST_MAX = 5;
    const searches = recentSearches.filter((item) => item.id != location.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...rest } = location;
    const updatedHistory = [rest, ...searches].slice(0, LIST_MAX);

    localStorageHelper.setItem(RECENT_SEARCHES, updatedHistory);
  };

  useEffect(() => {
    if (!trafficData || !locationId) return;

    const selectedLocation = trafficData.find(
      (traffic) => traffic.id === locationId
    );

    if (!selectedLocation) {
      messageApi.open({ type: "warning", content: "Location not found" });
      setLocation(null);
      return;
    }

    setLocation(selectedLocation);
    updateSearchHistory(selectedLocation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trafficData, locationId]);

  const onRecentSearchClick = (item: TrafficImage) => {
    setLocationId(item.id);
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
          {contextHolder}
          <Button
            type="primary"
            htmlType="submit"
            loading={isTrafficQueryLoading}
          >
            Search
          </Button>
        </Form.Item>
      </Form>

      {date ? (
        <div className="recent-record">
          <RecentSearches
            title="My Recent Searches"
            list={recentSearches}
            onItemClick={onRecentSearchClick}
          />
          <RecentSearches
            title="Recent Searches by Others"
            list={recentSearches}
            onItemClick={onRecentSearchClick}
          />
        </div>
      ) : null}

      <div className="locations-info">
        <div className="location-main">
          <LocationsList
            locationId={locationId}
            onLocationChange={setLocationId}
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
