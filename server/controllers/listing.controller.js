import { Listing } from "../models/listing.model.js";

export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  res.status(200).json({
    message: "Listing Created Successfully",
    listing,
  });
};
