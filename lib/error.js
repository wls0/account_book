module.exports = {
  errorCode:(res, code, msg, data)=>{
    let status = 'fail'
    if(code === 200){
      status = 'ok'
    }
    let box = {code, msg, status, data}
    res.status(code).json(box)
  }
}