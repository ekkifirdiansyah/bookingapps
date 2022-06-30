// checkRole ("admin")
const CheckRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Error Forbiden Role" }); // error forbiden
    }

    next();
  };
};

module.exports = CheckRole;
