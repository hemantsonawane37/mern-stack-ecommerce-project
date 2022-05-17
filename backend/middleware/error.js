const errorhandler = require("../util/errorhendler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "internal server error";

  // wrong mongodb ID error

  if (err.name === "CastError") {
    const message = `resorces not found invalid ${err.path} `;
    err = new errorhandler(message, 400);
  }

  // mongoose dublicate key error

  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered `;
    err = new errorhandler(message, 400);
  }

  //wrong jwt error

  if (err.name === "JsonWebTokenError") {
    const message = `json web token is invalid please ,try again`;
    err = new errorhandler(message, 400);
  }

  // jwt expire
  if (err.name === "JsonExpiredError") {
    const message = `json web token is Expired please ,try again`;
    err = new errorhandler(message, 400);
  }

  res.status(err.statuscode).json({ success: false, error: err.message });
};
