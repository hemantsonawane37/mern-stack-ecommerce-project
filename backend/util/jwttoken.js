const SendToken = (user, statuscode, res) => {
  const Token = user.getJwtToken();

  //option for cookie

  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", Token, option).json({
    success: true,
    user,
    Token,
  });
};


module.exports = SendToken ;