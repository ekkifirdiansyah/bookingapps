const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Authentifikasi

const auth = async (req, res, next) => {
  try {
    // console.log(req);
    // console.log(req.header("Authorization"))
    if (!req.header("Authorization")) {
      throw new Error("Authorization Not Found");
    }

    const token = await req.header("Authorization").replace("Bearer", "");
    const decode = jwt.verify(token, "Niomic");
    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Invalid Token");
    }

    req.user = user;
    req.user.token = token;
    next();
  } catch (err) {
    res.status(500).json({ Message: err.message });
  }
};

module.exports = auth;
