import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

// simple auth middleware using cookie token
const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decoded = jwt.verify(token, "dfbvdkjzfnvkjzdnfvkzdnjf");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

// POST /api/v1/user/subscribe
router.post("/subscribe", auth, async (req, res) => {
  try {
    const { tier } = req.body;
    const allowed = ["basic", "standard", "premium"];
    if (!allowed.includes(tier)) {
      return res.status(400).json({ message: "Invalid tier", success: false });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { isSubscribed: true, subscriptionTier: tier },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const tokenData = {
      id: updated._id,
      isSubscribed: updated.isSubscribed,
      subscriptionTier: updated.subscriptionTier,
    };
    const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf", { expiresIn: "1h" });
    const { password: _pw, ...safeUser } = updated.toObject();

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ success: true, user: safeUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
});

export default router;