import App from "../App";
import { render, screen } from "./testUtils";

describe("App", () => {
  it("testing text", () => {
    render(<App />);
    const dateField = screen.getByText("Date");
    const timeField = screen.getByText("Time");
    expect(dateField).toBeInTheDocument();
    expect(timeField).toBeInTheDocument();
  });
});
