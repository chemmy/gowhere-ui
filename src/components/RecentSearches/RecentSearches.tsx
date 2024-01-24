import { Typography, Button } from "antd";
import { ReactElement } from "react";

import "./style.less";

type RecentSearchesType = {
  title: string;
  list: Array<TrafficImage>;
  onItemClick: (item: TrafficImage) => void;
};

const { Text } = Typography;

const RecentSearches = ({
  title = "Recent Searches",
  list,
  onItemClick,
}: RecentSearchesType): ReactElement | null => {
  if (!list?.length) return null;

  return (
    <div className="recent-searches">
      <Text>{title}</Text>
      <ul className="list">
        {list.map((item) => (
          <Button
            type="link"
            size="small"
            onClick={() => onItemClick(item)}
            key={item.id}
          >
            {item.name}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
