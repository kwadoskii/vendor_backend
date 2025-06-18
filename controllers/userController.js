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
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
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
    res.status(401).json({ message: "Invalid username or password" });
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
