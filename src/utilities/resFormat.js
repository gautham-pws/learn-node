const resFormat = ({status, code, path, reqId, message}) => {
  switch (status) {
    case "fail":
      return {
        status: "error",
        status_code: code,
        timestamp: new Date(),
        path: path,
        request_id: reqId,
        error: {
          message: message,
        },
      };
    case "pass":
      return {
        status: "success",
        status_code: code,
        timestamp: new Date(),
        path: path,
        request_id: reqId,
        data: message,
      };
  }
};

export default resFormat;
