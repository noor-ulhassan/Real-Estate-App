import { Listing } from "../models/listing.model.js";
import { User } from "../models/user.model.js";

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
