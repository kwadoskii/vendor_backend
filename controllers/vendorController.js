import mongoose from "mongoose";

import Country from "../models/Country.js";
import State from "../models/State.js";
import Vendor from "../models/Vendor.js";

export const createVendor = async (req, res, next) => {
  const { state_id, country_id } = req.body;

  try {
    const countryExists = await Country.findById(country_id);

    if (!countryExists) {
      return res.status(400).json({ error: "Invalid country ID" });
    }

    if (mongoose.Types.ObjectId.isValid(state_id)) {
      const stateExists = await State.findById(state_id);

      if (!stateExists) {
        return res.status(400).json({ error: "Invalid state ID" });
      }
    }

    const vendor = await Vendor.create({
      ...req.body,
      country: country_id,
      state: state_id,
    });

    res.status(201).json(vendor);
  } catch (error) {
    next(error);
  }
};

export const getVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find()
      .populate("country", "name -_id")
      .populate("state", "name -_id")
      .populate("serviceType", "name -_id");
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

export const getVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate("country", "name -_id")
      .populate("state", "name -_id")
      .populate("serviceType", "name -_id");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (req, res, next) => {
  const { state_id, country_id } = req.body;
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { ...req.body, country: country_id, state: state_id },
      {
        new: true,
        runValidators: true,
      }
    );

    const countryExists = await Country.findById(country_id);

    if (!countryExists) {
      return res.status(400).json({ error: "Invalid country ID" });
    }

    if (mongoose.Types.ObjectId.isValid(state_id)) {
      const stateExists = await State.findById(state_id);

      if (!stateExists) {
        return res.status(400).json({ error: "Invalid state ID" });
      }
    }

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.json(vendor);
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    next(error);
  }
};
