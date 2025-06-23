import express from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from "../controllers/vendorController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getVendors);
router.post("/", protect, authorize("admin"), createVendor);
router.get("/:id", protect, getVendorById);
router.put("/:id", protect, authorize("admin"), updateVendor);
router.delete("/:id", protect, authorize("admin"), deleteVendor);

export default router;
