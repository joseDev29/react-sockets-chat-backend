const jwt = require("jsonwebtoken");
const {
  jwt: { key },
} = require("../config");

const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      key,
      {
        expiresIn: "15m",
      },
      (err, token) => {
        if (err) {
          console.log("<--------------- Error Generating JWT: ", err);
          reject("Error Generating JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateToken };
