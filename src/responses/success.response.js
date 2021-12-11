

module.exports = (res, httpStatus, msg, data, meta) => {
  
  
   return res.status(httpStatus).json({
    status: "SUCCESS",
    data: data,
    meta: meta,
    msg: msg
   })

}
