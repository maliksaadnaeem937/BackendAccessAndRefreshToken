class MyError {
  static passError = (status, message, res) => {
    const error = new Error(message);
    error.status = status || 500;
    return MyError.errorMiddleWare(error, res);
  };


  static errorMiddleWare = (err, res) => {
    const message = err.message || "backend error";
    const status = err.status || 500;

    return res.status(status).json({
      message,
      status,
    });
  };

}

export default MyError;