import WeatherIconLegendPopover from "../../components/WeatherIconLegendPopover/WeatherIconLegendPopover";
import { render, screen } from "../testUtils";

describe("WeatherForecast", () => {
  it("should display button", () => {
    render(<WeatherIconLegendPopover />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
