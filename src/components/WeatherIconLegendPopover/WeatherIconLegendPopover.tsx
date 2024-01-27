import { useState } from "react";
import { Button, Flex, Popover, Typography } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

import { weatherIcons } from "@common/constants/weather";

const { Text } = Typography;

const WeatherIconLegendPopover = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const IconList = (
    <Flex
      vertical
      gap="small"
      style={{ width: 250, height: 400, overflow: "auto" }}
    >
      <Text strong>Weather Icons Legend</Text>

      {Object.entries(weatherIcons).map(([key, IconComponent]) => (
        <Flex key={key} align="center" gap="middle">
          <IconComponent size={25} />
          <Text strong>{key}</Text>
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Popover
      content={IconList}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button
        type="text"
        size="small"
        shape="circle"
        icon={<QuestionCircleFilled />}
      />
    </Popover>
  );
};

export default WeatherIconLegendPopover;
