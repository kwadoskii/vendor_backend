import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, username, password, role } = req.body;

  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (!email || !username) {
    return res.status(400).json({
      message: emailExists ? "Email cannot be null" : "Username cannot be null",
    });
  }

  if (emailExists || usernameExists) {
    return res.status(400).json({
      message: emailExists ? "Email already registered" : "Username already taken",
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ $or: [{ email }, { username: email }] });

  if (user && (await user.matchPassword(password))) {
    if (!user.status) return res.status(403).json({ message: "User is inactive" });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(404).json({ message: "Invalid login credentials" });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, email, username } = req.body;

    // Optional: prevent duplicate email
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      user.email = email;
    }

    // Optional: prevent duplicate username
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      user.username = username;
    }

    // Apply allowed updates
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
      token: generateToken(updatedUser._id, updatedUser.role), // refresh token
    });
  } catch (error) {
    next(error);
  }
};
