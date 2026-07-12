import { Listing } from "../models/listing.model.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  // Security: users can only update their own account
  if (req.user.userId !== req.params.id) {
    return res.status(401).json({ success: false, message: "You can only update your own account!" });
  }
  try {
    // If user wants to change password, hash it first
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // Return the updated document
    );

    // Don't send password back to frontend
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Security: users can only delete their own account
  if (req.user.userId !== req.params.id) {
    return res.status(401).json({ success: false, message: "You can only delete your own account!" });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User has been deleted!" });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  // Check if the user is requesting their OWN listings
  if (req.user.userId === req.params.id) {
    try {
      // Find all listings where userRef matches the requested ID
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "You can only view your own listings!",
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};
