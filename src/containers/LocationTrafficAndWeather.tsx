import { Form, DatePicker, TimePicker, Button } from "antd";
import { ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Dayjs } from "dayjs";

import { gowhereApi } from "../services/gowhere/api";

const LocationTrafficAndWeather = (): ReactElement => {
  const [form] = Form.useForm();

  const [date, setDate] = useState<string>("");
  const [locationId, setLocationId] = useState<string | null>(null);

  console.log({ date, locationId });

  // TODO: move types
  type LocationFormType = {
    date: Dayjs;
    time: Dayjs;
  };

  // Handle multiple failed calls
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
    setDate(combinedDateTime.toISOString().replace(/\.\d+Z$/, ""));
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="date" label="Date" required>
        <DatePicker placeholder="Select date" />
      </Form.Item>
      <Form.Item name="time" label="Time" required>
        <TimePicker placeholder="Select Time" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LocationTrafficAndWeather;
