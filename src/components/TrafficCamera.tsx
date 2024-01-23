import { ReactElement } from "react";
import { Card, Image } from "antd";
import { imageFallback } from "../common/constants/image";

type TrafficCameraType = {
  location: TrafficImage | null;
};

const TrafficCamera = ({
  location,
}: TrafficCameraType): ReactElement | null => {
  if (!location) return null;

  const { name, image } = location;

  return (
    <Card cover={<Image alt={name} src={image} fallback={imageFallback} />}>
      <Card.Meta description={name} />
    </Card>
  );
};

export default TrafficCamera;
