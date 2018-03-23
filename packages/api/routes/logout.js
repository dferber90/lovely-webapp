const logout = (req, res, next) => {
  res.clearCookie('authToken');
  res.json({});
  return next();
};

module.exports = { logout };
