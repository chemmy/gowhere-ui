import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";
import { render, screen } from "../testUtils";

describe("WeatherForecast", () => {
  const componentTitle = "Weather Forecast";
  const locationForecast = { forecast: "Sunny" };
  const params = {
    locationForecast,
    isLoading: false,
    error: null,
  };

  it("should display Weather Forecast label", () => {
    render(<WeatherForecast {...params} />);
    const title = screen.getByText(componentTitle);
    expect(title).toBeInTheDocument();
  });

  it("should display Weather Forecast value", () => {
    render(<WeatherForecast {...params} />);
    const forecast = screen.getByText(locationForecast.forecast);
    expect(forecast).toBeInTheDocument();
  });

  it("should not display title if isloading is true", () => {
    const isLoadingParams = { ...params, isLoading: true };
    render(<WeatherForecast {...isLoadingParams} />);
    const title = screen.queryByText(componentTitle);
    expect(title).not.toBeInTheDocument();
  });

  it("should display error if an error is passed", () => {
    const error = "Unknown error";
    const errorParams = { ...params, error };
    render(<WeatherForecast {...errorParams} />);
    const errorElement = screen.queryByText(error);
    expect(errorElement).toBeInTheDocument();
  });

  it("should not display component if no locationForecast is passed", () => {
    const noLocationParams = { ...params, locationForecast: undefined };
    render(<WeatherForecast {...noLocationParams} />);
    const title = screen.queryByText(componentTitle);
    expect(title).not.toBeInTheDocument();
  });
});
