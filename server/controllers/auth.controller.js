import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

// Google Auth

export const googleAuth = async (req, res) => {
  try {
    const { email, name, photoUrl } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
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
      return res.status(200).json({
        message: "User Logged In Successfully",
        status: 200,
        success: true,
        user,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photoUrl,
      });
      await newUser.save();
      const payload = {
        userId: newUser._id,
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
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User Logged Out Successfully",
    success: true,
  });
};
