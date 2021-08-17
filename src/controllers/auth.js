const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../utils/generate-token");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const uniqueVerifyEmail = await User.findOne({ email });

    if (uniqueVerifyEmail)
      return res.status(400).json({
        ok: false,
        msg: "incorrect data",
      });

    const user = new User({ name, email, password });

    //password encrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //user save in db
    await user.save();

    //generate token
    const token = await generateToken({ uid: user.id });

    return res.status(201).json({
      ok: true,
      msg: "user created successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("----------> Error in createUser Controller : ", error);
    return res.status(500).json({
      ok: false,
      msg: "ops, internal error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    //verificar existencia del usuario
    if (!userDB)
      return res.status(404).json({
        ok: false,
        msg: "email or password are incorrent",
      });

    //validar password
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword)
      return res.status(404).json({
        ok: false,
        msg: "email or password are incorrent",
      });

    const token = await generateToken({ uid: userDB.id });

    return res.status(200).json({
      ok: true,
      user: {
        name: userDB.name,
        email: userDB.email,
      },
      token,
    });
  } catch (error) {
    console.log("----------> Error in login Controller : ", error);
    return res.status(500).json({
      ok: false,
      msg: "ops, internal error",
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const { uid } = req.tokenPayload;

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "invalid token",
      });
    }

    const token = await generateToken({ uid });

    return res.status(200).json({
      ok: true,
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("----------> Error in renew Controller : ");
    return res.status(500).json({
      ok: false,
      msg: "ops, internal error",
    });
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
