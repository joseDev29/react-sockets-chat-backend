const jwt = require("jsonwebtoken");
const {
  jwt: { key },
} = require("../config");

const validateToken = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token)
      return res.status(401).json({
        ok: false,
        msg: "token is required",
      });

    const payload = jwt.verify(token, key);

    req.tokenPayload = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "invalid token",
    });
  }
};

module.exports = { validateToken };
