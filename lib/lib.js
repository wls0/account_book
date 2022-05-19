const Error = (err, req, res, next) => {
  res.status(err.statusCode).json({
    code: err.statusCode,
    result: false,
    msg: err.message,
    data: ''
  })
}

const Send = (res, data) => {
  res.status(200).json({
    code: 200,
    result: true,
    msg: '',
    data
  })
}

module.exports = { Error, Send }
