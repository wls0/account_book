export const Error = (err, req, res, next) => {
  return res.status(err.statusCode).json({
    code: err.statusCode,
    result: false,
    msg: err.message,
    data: "",
  });
};
