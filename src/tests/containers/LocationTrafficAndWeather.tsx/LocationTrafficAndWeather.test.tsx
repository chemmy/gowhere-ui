import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationTrafficAndWeather from "../../../containers/LocationTrafficAndWeather/LocationTrafficAndWeather";
import { fireEvent, render, screen } from "../../testUtils";

describe("LocationTrafficAndWeather", () => {
  const Component = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <LocationTrafficAndWeather />
      </QueryClientProvider>
    );
  };
  it("should display fields", () => {
    render(<Component />);
    const dateLabel = screen.getByLabelText("Date");
    expect(dateLabel).toBeInTheDocument();

    const timeLabel = screen.getByLabelText("Time");
    expect(timeLabel).toBeInTheDocument();
  });

  it("should display form fields", () => {
    render(<Component />);
    const dateField = screen.getByPlaceholderText("Select date");
    expect(dateField).toBeInTheDocument();

    const timeField = screen.getByPlaceholderText("Select time");
    expect(timeField).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeInTheDocument();
  });

  it("should show required message if search is clicked without filling fields", async () => {
    render(<Component />);

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    const requiredMessage = await screen.findByText("Field is required");
    expect(requiredMessage).toBeInTheDocument();
  });
});
