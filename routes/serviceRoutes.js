import express from "express";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", protect, getAllServices);
router.post("/", protect, authorize("admin"), createService);
router.put("/:id", protect, authorize("admin"), updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);

export default router;
