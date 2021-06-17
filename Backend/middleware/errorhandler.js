function errorHandler(err, req, res, next) {
  console.log("error handler invoked");
  if (err) {
    if (err.code === 11000) {
      console.log("Duplicate Error : ", err.keyValue);
      res.json({ success: false, "Duplicate Error": err.keyValue })
    }
    else {
      res.json({ success: false, Error: err.message })
    }
  }

}

module.exports = errorHandler;