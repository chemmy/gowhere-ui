import { Alert } from "antd";

type ErrorMessagePropsType = {
  error: Error | null | string;
};

const ErrorMessage = ({ error }: ErrorMessagePropsType) => {
  const { message, error: errorTitle } =
    (error as unknown as ApiErrorResponseType)?.response?.data || {};

  const alertTitle = typeof error === "string" ? error : errorTitle;

  return (
    <Alert
      message={alertTitle}
      description={message || "Unknown Error"}
      type="error"
      showIcon
    />
  );
};

export default ErrorMessage;
