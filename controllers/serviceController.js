import Service from "../models/Service.js";
import Vendor from "../models/Vendor.js";

export const createService = async (req, res, next) => {
  try {
    const { name, providedBy } = req.body;

    const vendorExists = await Vendor.findById(providedBy);
    if (providedBy && !vendorExists) {
      return res.status(400).json({ error: "Invalid vendor ID" });
    }

    const service = new Service({
      name,
      providedBy,
      createdBy: req.user._id,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find()
      .populate("providedBy", "-isActive")
      .populate("createdBy", "name email");

    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("providedBy", "-isActive")
      .populate("createdBy", "name email");

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { name, providedBy, isActive } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, providedBy, isActive },
      { new: true, runValidators: true }
    );

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) return res.status(404).json({ error: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};
