import { ReactElement } from "react";
import { Card, Image } from "antd";
import { imageFallback } from "@common/constants/image";

import "./style.less";

type TrafficCameraPropsType = {
  location: TrafficImageType | null;
};

const TrafficCamera = ({
  location,
}: TrafficCameraPropsType): ReactElement | null => {
  if (!location) return null;

  const { name, image } = location;

  return (
    <div className="traffic-camera">
      <label>Traffic image</label>
      <Card cover={<Image alt={name} src={image} fallback={imageFallback} />}>
        <Card.Meta description={name} />
      </Card>
    </div>
  );
};

export default TrafficCamera;
