import { Typography, Button } from "antd";
import { ReactElement } from "react";

import "./style.less";

type RecentSearchesPropsType = {
  title?: string;
  list: Array<RecentSearchesType>;
  onItemClick: (item: RecentSearchesType) => void;
};

const { Text } = Typography;

const RecentSearches = ({
  title = "Recent Searches",
  list,
  onItemClick,
}: RecentSearchesPropsType): ReactElement | null => {
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
