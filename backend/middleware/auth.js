const jwtToken = require("jsonwebtoken");
const CatchAsyncError = require("../middleware/catchasyncerror");
const Errorhandler = require("../util/errorhendler");
const User = require("../modules/usermodules");

exports.isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Errorhandler("please login to access this resorce", 401));
  }
  const decodeData = jwtToken.verify(token, process.env.JWT_SECRETKEY);

  req.user = await User.findById(decodeData._id);

  next();
});

exports.autherizedRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role:${req.user.role} is not allowed to access this resorce`,
          403
        )
      );
    }
    next();
  };
};
