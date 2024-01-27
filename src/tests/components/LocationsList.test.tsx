import LocationsList from "../../components/LocationsList/LocationsList";
import { mockTrafficImageLocations } from "../mock/traffic";
import { render, screen } from "../testUtils";

describe("LocationsList", () => {
  const params = {
    locationId: null,
    onLocationChange: () => vi.fn(),
    trafficData: mockTrafficImageLocations,
    error: null,
  };

  it("should display the locations field", () => {
    render(<LocationsList {...params} />);
    const label = screen.getByText("Location");
    expect(label).toBeInTheDocument();
  });

  it("should display default placeholder if no locationId is available", () => {
    render(<LocationsList {...params} />);
    const placeholder = screen.getByText("Please select location");
    expect(placeholder).toBeInTheDocument();
  });

  it("should display placeholder that there is no available data if no trafficData is passed", () => {
    const noTrafficDataParams = { ...params, trafficData: [] };
    render(<LocationsList {...noTrafficDataParams} />);
    const placeholder = screen.getByText("No available location");
    expect(placeholder).toBeInTheDocument();
  });

  it("should display location name of locationId that is provided", () => {
    const locationId = mockTrafficImageLocations[0].id;
    const withLocationIdParams = { ...params, locationId };
    render(<LocationsList {...withLocationIdParams} />);
    const placeholder = screen.getByText(mockTrafficImageLocations[0].name);
    expect(placeholder).toBeInTheDocument();
  });
});
