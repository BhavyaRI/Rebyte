const userAccount = require("../models/userAccount");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/mail");

const signin = async (req, res) => {
  try {
    const newAcc = await userAccount.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    return res.status(201).json({
      status: "Success",
      data: {
        user: newAcc,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({
        status: "Failed",
        message: error.message,
      });
    }
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide email and password",
      });
    }

    const user = await userAccount.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect username or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Internal server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const user = await userAccount.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(200)
      .json({ message: "If the email id is valid you will receieve a mail" });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const url = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a request for new password at: ${url}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendMail({
      email: user.email,
      subject: "Password reset(valid for 10min)",
      message,
    });
    //mail send
    res.status(200).json({ status: "success", message: "Reset Link sent to mail" });
  } catch (err) {
    console.error("--- NODEMAILER ERROR ---");
    console.error(err); // Log the full error object
    console.error("--- END NODEMAILER ERROR ---");

    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res
      .status(500)
      .json({ message: "There was an error sending email" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const inputoken = req.params.token;
    const hashtoken = crypto
      .createHash("sha256")
      .update(inputoken)
      .digest("hex");

    const user = await userAccount.findOne({
      passwordResetToken: hashtoken,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token expired or invalid" });
    }

    user.password = req.body.password;

    user.passwordConfirm = req.body.password;

    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res
      .status(500)
      .json({ status: "Failed", message: "Could not reset password" });
  }
};

module.exports = {
  signin,
  login,
  resetPassword,
  forgotPassword,
};
