import express from "express";
import { getUserListings, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", getUser); // Public — needed for Contact Landlord feature

export default router;
