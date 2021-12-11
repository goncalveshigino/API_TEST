



module.exports = (res, httpStatus, msg, error) => {
  
  
   return res.status(httpStatus).json({
    status: "Error",
    data: data,
    error: error,
    msg: msg
   })

}
