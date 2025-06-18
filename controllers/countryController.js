import Country from "../models/Country.js";

export const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find().sort("name");
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

export const createCountry = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCountry = await Country.create({ name });
    res.status(201).json(newCountry);
  } catch (error) {
    next(error);
  }
};

export const updateCountry = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.json({
      message: "Country updated successfully",
      country: updatedCountry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCountry = async (req, res, next) => {
  const { id } = req.params;

  try {
    const country = await Country.findById(id);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    await Country.findByIdAndDelete(id);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    next(error);
  }
};
