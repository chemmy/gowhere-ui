import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { render, screen } from "../testUtils";

describe("ErrorMessage", () => {
  it("should display the error message which is passed as string", () => {
    const error = "Some error";
    render(<ErrorMessage error={error} />);
    const errorElement = screen.getByText(error);
    expect(errorElement).toBeInTheDocument();
  });

  it("should display the error title and message which is passed as Error", () => {
    const title = "Internal Error";
    const message = "Contact support";
    const error = {
      response: {
        data: {
          error: title,
          message,
          statusCode: 500,
        },
      },
    };
    render(<ErrorMessage error={error as unknown as Error} />);
    const errorTitle = screen.getByText(title);
    expect(errorTitle).toBeInTheDocument();

    const errorMsg = screen.getByText(message);
    expect(errorMsg).toBeInTheDocument();
  });

  it("should be displayed as an alert", () => {
    render(<ErrorMessage error="Some error" />);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
  });
});
