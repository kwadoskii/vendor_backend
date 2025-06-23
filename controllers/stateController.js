import State from "../models/State.js";
import Country from "../models/Country.js";

// Create state
export const createState = async (req, res, next) => {
  try {
    const { name, country_id } = req.body;

    // Optional: ensure country exists
    const countryExists = await Country.findById(country_id);
    if (country_id && !countryExists) {
      return res.status(400).json({ error: "Invalid country ID" });
    }

    const state = await State.create({ name, country: country_id });
    res.status(201).json(state);
  } catch (error) {
    next(error);
  }
};

// Get all states or all states by Country ID
export const getStates = async (req, res, next) => {
  const country_id = req.body?.country_id;

  if (country_id) {
    try {
      const states = await State.find({ country: country_id }).populate("country", "name");

      if (!states) return res.status(404).json({ message: "States not found" });

      res.json(states);
    } catch (error) {
      next(error);
    }
  }

  try {
    const states = await State.find()
      .populate("country", "-_id name")
      .sort("country name")
      .select("-__v");
    res.json(states);
  } catch (error) {
    next(error);
  }
};

// Get state by ID
export const getStateById = async (req, res, next) => {
  try {
    const state = await State.findById(req.params.id).populate("country", "name");

    if (!state) return res.status(404).json({ message: "State not found" });

    res.json(state);
  } catch (error) {
    next(error);
  }
};

// Update state
export const updateState = async (req, res, next) => {
  const { id: stateId } = req.params;

  try {
    const updatedState = State.findByIdAndUpdate(stateId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedState) return res.status(404).json({ message: "State not found" });

    res.json({
      message: "State updated successfully",
      state: updatedState,
    });
  } catch (error) {
    next(error);
  }
};

// Delete state
export const deleteState = async (req, res, next) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ message: "State not found" });

    res.json({ message: "State deleted successfully" });
  } catch (error) {
    next(error);
  }
};
