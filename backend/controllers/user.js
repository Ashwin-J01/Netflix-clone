// User controllers: Login, Register, Logout
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dfbvdkjzfnvkjzdnfvkzdnjf";

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const tokenData = {
      id: user._id,
      isSubscribed: user.isSubscribed,
      subscriptionTier: user.subscriptionTier,
    };

    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });

    const { password: _pw, ...safeUser } = user.toObject();
    return res.status(200).cookie("token", token, cookieOptions()).json({
      message: `Welcome back ${user.fullName}`,
      user: safeUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
    })
    .json({ message: "User logged out successfully.", success: true });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "This email is already used", success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const created = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isSubscribed: false,
      subscriptionTier: "none",
    });

    const tokenData = {
      id: created._id,
      isSubscribed: created.isSubscribed,
      subscriptionTier: created.subscriptionTier,
    };

    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });
    const { password: _pw, ...safeUser } = created.toObject();

    return res.status(201).cookie("token", token, cookieOptions()).json({
      message: "Account created successfully.",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
// Clean, single implementation for user controllers
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dfbvdkjzfnvkjzdnfvkzdnjf";

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const tokenData = {
      id: user._id,
      isSubscribed: user.isSubscribed,
      subscriptionTier: user.subscriptionTier,
    };

    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });

    const { password: _pw, ...safeUser } = user.toObject();
    return res.status(200).cookie("token", token, cookieOptions()).json({
      message: `Welcome back ${user.fullName}`,
      user: safeUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", expires: new Date(0) })
    .json({ message: "User logged out successfully.", success: true });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "This email is already used", success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const created = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isSubscribed: false,
      subscriptionTier: "none",
    });

    const tokenData = {
      id: created._id,
      isSubscribed: created.isSubscribed,
      subscriptionTier: created.subscriptionTier,
    };

    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });
    const { password: _pw, ...safeUser } = created.toObject();

    return res.status(201).cookie("token", token, cookieOptions()).json({
      message: "Account created successfully.",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dfbvdkjzfnvkjzdnfvkzdnjf";

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const tokenData = {
      id: user._id,
      isSubscribed: user.isSubscribed,
      subscriptionTier: user.subscriptionTier,
    };

    const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });

    const { password: _pw, ...safeUser } = user.toObject();
    return res.status(200).cookie("token", token, cookieOptions()).json({
      message: `Welcome back ${user.fullName}`,
      user: safeUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", expires: new Date(0) })
    .json({ message: "User logged out successfully.", success: true });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "This email is already used", success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    const created = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isSubscribed: false,
      subscriptionTier: "none",
    });

    const tokenData = {
      id: created._id,
      isSubscribed: created.isSubscribed,
      subscriptionTier: created.subscriptionTier,
    };
    const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });
    const { password: _pw, ...safeUser } = created.toObject();

    return res.status(201).cookie("token", token, cookieOptions()).json({
      message: "Account created successfully.",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dfbvdkjzfnvkjzdnfvkzdnjf";

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const tokenData = {
      id: user._id,
      isSubscribed: user.isSubscribed,
      subscriptionTier: user.subscriptionTier,
    };

    const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });

    const { password: _pw, ...safeUser } = user.toObject();
    return res.status(200).cookie("token", token, cookieOptions()).json({
      message: `Welcome back ${user.fullName}`,
      user: safeUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", expires: new Date(0) })
    .json({ message: "User logged out successfully.", success: true });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "This email is already used", success: false });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    const created = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isSubscribed: false,
      subscriptionTier: "none",
    });

    const tokenData = {
      id: created._id,
      isSubscribed: created.isSubscribed,
      subscriptionTier: created.subscriptionTier,
    };
    const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });
    const { password: _pw, ...safeUser } = created.toObject();

    return res.status(201).cookie("token", token, cookieOptions()).json({
      message: "Account created successfully.",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
const JWT_SECRET = process.env.JWT_SECRET || "dfbvdkjzfnvkjzdnfvkzdnjf";

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
});
                message: "Invalid data",
                success: false
            })
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }
        const tokenData = {
            id: user._id,
            isSubscribed: user.isSubscribed,
            subscriptionTier: user.subscriptionTier
        }
        const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf", { expiresIn: "1h" });

        const { password: _pw, ...safeUser } = user.toObject();
        return res.status(200)..cookie("token", token, {
            httpOnly: true,
            secure: true,        // required on https
        const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });
        }).json({
            message: `Welcome back ${user.fullName}`,
        return res.status(200)
          .cookie("token", token, cookieOptions())
          .json({
            message: `Welcome back ${user.fullName}`,
            user: safeUser,
            success: true
          });
export const Logout = async (req, res) => {
    return res.status(200)..cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0)
    })
    return res.status(200)
      .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', expires: new Date(0) })
      .json({
        message: "User logged out successfully.",
        success: true,
      });
            return res.status(401).json({
                message: "Invalid data",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "This email is already used",
                success: false,
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        const created = await User.create({
            fullName,
            email,
            password: hashedPassword,
            isSubscribed: false,
            subscriptionTier: 'none'
        });

        const tokenData = {
            id: created._id,
            isSubscribed: created.isSubscribed,
            subscriptionTier: created.subscriptionTier
        };
        const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf", { expiresIn: "1h" });
        const { password: _pw, ...safeUser } = created.toObject();

        return res.status(201).cookie("token", token, { httpOnly: true }).json({
            message: "Account created successfully.",
            success: true,
        const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" });
        })

        return res.status(201)
          .cookie("token", token, cookieOptions())
          .json({
            message: "Account created successfully.",
            success: true,
            user: safeUser
          });
