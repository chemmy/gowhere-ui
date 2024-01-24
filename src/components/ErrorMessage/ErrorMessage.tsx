import { Alert } from "antd";

import { ApiErrorResponseType } from "../../common/types/api";

type ErrorMessageType = {
  error: Error | null;
};

const ErrorMessage = ({ error }: ErrorMessageType) => {
  const { message, error: errorTitle } =
    (error as unknown as ApiErrorResponseType)?.response?.data || {};

  const alertTitle = errorTitle || "Unknown Error";

  return (
    <Alert message={alertTitle} description={message} type="error" showIcon />
  );
};

export default ErrorMessage;
