import Country from "../models/Country.js";

export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCountry = async (req, res) => {
  const { name } = req.body;

  try {
    const newCountry = await Country.create({ name });
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCountry = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findById(id);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    await Country.findByIdAndDelete(id);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
