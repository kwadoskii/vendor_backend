import ServiceType from "../models/ServiceType.js";

export const getServiceType = async (req, res, next) => {
  try {
    const serviceType = await ServiceType.find().sort("name");
    res.json(serviceType);
  } catch (error) {
    next(error);
  }
};

export const createServiceType = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newServiceType = await ServiceType.create({ name });
    res.status(201).json(newServiceType);
  } catch (error) {
    next(error);
  }
};

export const updateServiceType = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedServiceType = await ServiceType.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedServiceType) return res.status(404).json({ message: "ServiceType not found" });

    res.json({
      message: "ServiceType updated successfully",
      serviceType: updatedServiceType,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteServiceType = async (req, res, next) => {
  const { id } = req.params;

  try {
    const serviceType = await ServiceType.findById(id);

    if (!serviceType) {
      return res.status(404).json({ message: "ServiceType not found" });
    }

    await ServiceType.findByIdAndDelete(id);
    res.json({ message: "ServiceType deleted successfully" });
  } catch (error) {
    next(error);
  }
};
