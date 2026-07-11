import { Listing } from "../models/listing.model.js";

export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found!" });
    }
    if (req.user.userId !== listing.userRef) {
      return res.status(401).json({ success: false, message: "You can only delete your own listings!" });
    }
    
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found!" });
    }
    if (req.user.userId !== listing.userRef) {
      return res.status(401).json({ success: false, message: "You can only update your own listings!" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the newly updated document
    );
    return res.status(200).json({ success: true, updatedListing });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found!" });
    }
    return res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};
