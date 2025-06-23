import express from "express";
import { authorize, protect } from "../middlewares/authMiddleware.js";
import {
  createServiceType,
  deleteServiceType,
  getServiceType,
  updateServiceType,
} from "../controllers/serviceTypeController.js";

const router = express.Router();

router.get("/", protect, getServiceType);
router.post("/", protect, authorize("admin"), createServiceType);
router.put("/:id", protect, authorize("admin"), updateServiceType);
router.delete("/:id", protect, authorize("admin"), deleteServiceType);

export default router;
