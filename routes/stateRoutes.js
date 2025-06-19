import express from "express";
import {
  createState,
  getStates,
  getStateById,
  updateState,
  deleteState,
  // getStatesByCountryId,
} from "../controllers/stateController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.route("/").get(getStates).post(protect, authorize("admin"), createState);
// router.get("/country/:country_id", protect, getStatesByCountryId);

router.get("/", protect, getStates);
router.post("/", protect, authorize("admin"), createState);

router
  .route("/:id")
  .get(protect, getStateById)
  .put(protect, authorize("admin"), updateState)
  .delete(protect, authorize("admin"), deleteState);

export default router;
