import express from "express";
import {
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry,
} from "../controllers/countryController.js";

const router = express.Router();

router.get("/", getCountries);
router.post("/", createCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

export default router;
