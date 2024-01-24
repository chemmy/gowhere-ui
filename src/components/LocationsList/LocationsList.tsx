import { ReactElement } from "react";
import { Select } from "antd";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

type LocationsListType = {
  locationId: string | null;
  onLocationChange: (value: string) => void;
  trafficData: TrafficImage[] | undefined;
  error: Error | null;
};

const LocationsList = ({
  locationId,
  onLocationChange,
  trafficData,
  error,
}: LocationsListType): ReactElement | null => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!trafficData) return null;

  const getLocationOptions = () => {
    if (!trafficData) return [];
    return trafficData.map((item) => ({ value: item.id, label: item.name }));
  };

  return (
    <div className="locations-list form-group">
      <label className="form-group-label">Location</label>
      <Select
        value={locationId}
        options={getLocationOptions()}
        onChange={onLocationChange}
        placeholder="Please select location"
        className="location-select"
      />
    </div>
  );
};

export default LocationsList;
