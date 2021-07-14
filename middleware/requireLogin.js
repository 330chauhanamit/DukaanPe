const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    console.log("you must be logged in");
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  // console.log(token);
  jwt.verify(token, process.env.SECRET_OR_KEY, (err, payload) => {
    if (err) {
      console.log("you must be logged in");
      return res.status(401).json({ error: "you must be logged in" });
    }
    const { id } = payload;
    // console.log(payload);
    User.findById(id).then((userdata) => {
      // console.log(userdata);
      req.user = userdata;
      next();
    });
  });
};
