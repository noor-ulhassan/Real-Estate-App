import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const isExists = await User.findOne({
    email: email,
  });
  if (isExists) {
    return res.status(422).json({
      message: "User Already Exists with email",
      success: false,
    });
  }

  const newUser = await User.create({
    email,
    password,
    username,
  });

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  res.json({
    message: "User Registered Successfully",
    status: 201,
    success: true,
    newUser,
  });
};

// Login Controller

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(422).json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "User not found",
      success: false,
    });
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid Credentials",
      success: false,
    });
  }

  const payload = {
    userId: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "User Logged In Successfully",
    status: 200,
    success: true,
    user,
  });
};
