import { Listing } from "../models/listing.model.js";

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
