import { Alert } from "antd";

type ErrorMessagePropsType = {
  error: Error | null;
};

const ErrorMessage = ({ error }: ErrorMessagePropsType) => {
  const { message, error: errorTitle } =
    (error as unknown as ApiErrorResponseType)?.response?.data || {};

  const alertTitle = errorTitle || "Unknown Error";

  return (
    <Alert message={alertTitle} description={message} type="error" showIcon />
  );
};

export default ErrorMessage;
