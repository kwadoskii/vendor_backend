import express from "express";
import {
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry,
} from "../controllers/countryController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCountries);
router.post("/", protect, authorize("admin"), createCountry);
// router.route("/").get(protect, getCountries).post(createCountry, protect, authorize("admin"));
router.put("/:id", protect, authorize("admin"), updateCountry);
router.delete("/:id", protect, authorize("admin"), deleteCountry);

export default router;
