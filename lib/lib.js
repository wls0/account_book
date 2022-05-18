export const Error = (err, req, res, next) => {
  return res.status(err.statusCode).json({
    code: err.statusCode,
    result: false,
    msg: err.message,
    data: "",
  });
};

export const Send = (res, data) => {
  res.status(200).json({
    code: 200,
    result: true,
    msg: "",
    data,
  });
};
