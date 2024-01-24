export type ApiErrorResponseType = {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
};
