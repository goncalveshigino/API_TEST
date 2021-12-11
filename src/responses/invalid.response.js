




module.exports = (res, httpStatus, msg, error) => {
  
  
  return res.status(httpStatus).json({
    status: "INVALID",
    msg: msg,
    error: error.errors.map(err => {
        return {
            msg: err.msg,
            field: err.path,
            value: err.value
        }

        })
    })

}
