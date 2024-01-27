import TrafficCamera from "../../components/TrafficCamera/TrafficCamera";
import { mockTrafficImageLocations } from "../mock/traffic";
import { render, screen } from "../testUtils";

describe("TrafficCamera", () => {
  const params = {
    location: mockTrafficImageLocations[0],
  };

  it("should display traffic image label", () => {
    render(<TrafficCamera {...params} />);
    const title = screen.getByText("Traffic image");
    expect(title).toBeInTheDocument();
  });

  it("should display traffic image location name", () => {
    render(<TrafficCamera {...params} />);
    const title = screen.getByText(params.location.name);
    expect(title).toBeInTheDocument();
  });

  it("should not display Traffic image label if no location passed", () => {
    render(<TrafficCamera location={null} />);
    const title = screen.queryByText("Traffic image");
    expect(title).not.toBeInTheDocument();
  });
});
