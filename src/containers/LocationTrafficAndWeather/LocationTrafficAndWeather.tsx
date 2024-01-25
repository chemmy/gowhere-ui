import { ReactElement, useEffect, useState } from "react";
import { Form, DatePicker, TimePicker, Button, message } from "antd";
import { useQuery } from "@tanstack/react-query";

import type { Dayjs } from "dayjs";

import TrafficCamera from "../../components/TrafficCamera/TrafficCamera";
import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";
import LocationsList from "../../components/LocationsList/LocationsList";
import RecentSearches from "../../components/RecentSearches/RecentSearches";
import { gowhereApi } from "../../services/gowhere/api";
import { validation } from "../../common/constants/forms";
import {
  LOCAL_STORAGE_KEYS,
  localStorageHelper,
} from "../../common/helpers/localStorage";

import "./style.less";

type LocationFormType = {
  date: Dayjs;
  time: Dayjs;
};

const LocationTrafficAndWeather = (): ReactElement => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<TrafficImageType | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);

  const { RECENT_SEARCHES } = LOCAL_STORAGE_KEYS;
  const recentSearches =
    localStorageHelper.getItem<Array<TrafficImageType>>(RECENT_SEARCHES) || [];

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

  const { data: recentQueryData } = useQuery({
    queryKey: ["most-recent"],
    queryFn: () => gowhereApi.getMostRecentSearches(),
    enabled: !!date,
    select: (response) => response,
  });

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

  const LIST_MAX = 5;
  const updateSearchHistory = (location: TrafficImageType) => {
    const searches = recentSearches.filter((item) => item.id != location.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...rest } = location;
    const updatedHistory = [rest, ...searches].slice(0, LIST_MAX);

    localStorageHelper.setItem(RECENT_SEARCHES, updatedHistory);
  };

  const onRecentSearchClick = (item: RecentSearchesType) => {
    setLocationId(item.id);
  };

  const onRecentSearchByOthersClick = (item: RecentSearchesType) => {
    const record = trafficData?.find((traffic) => traffic.name === item.name);
    setLocationId(record?.id || null);
  };

  const getRecentSearchesByOthers = (): Array<RecentSearchesType> => {
    if (!recentSearches?.length || !recentQueryData?.length) return [];
    return recentQueryData
      .filter((othersSearch) => {
        return !recentSearches
          .slice(0, LIST_MAX)
          .find((mySearches) => othersSearch.name === mySearches.name);
      })
      .slice(0, LIST_MAX);
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
            list={getRecentSearchesByOthers()}
            onItemClick={onRecentSearchByOthersClick}
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
