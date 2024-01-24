import { Alert } from "antd";

import { ApiErrorResponseType } from "../../common/types/api";

type ErrorMessageType = {
  error: Error | null;
};

const ErrorMessage = ({ error }: ErrorMessageType) => {
  const { message, error: errorTitle } =
    (error as unknown as ApiErrorResponseType)?.response?.data || {};

  const alertTitle = errorTitle || "Unknown Error";
  const alertDescription =
    message || "Something went wrong. Please contact support.";

  return (
    <Alert
      message={alertTitle}
      description={alertDescription}
      type="error"
      showIcon
    />
  );
};

export default ErrorMessage;
