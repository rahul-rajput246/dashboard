import express from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead,
} from "../controllers/leadController";
import protect from "../middleware/authMiddleware";
import authorizeRoles from "../middleware/roleMiddleware";
import validateRequest from "../middleware/validateRequest";
import { leadBodyValidator, leadIdValidator, leadQueryValidator } from "../validators/leadValidators";

const router = express.Router();

router.use(protect);

router.get("/", leadQueryValidator, validateRequest, getLeads);
router.get("/:id", leadIdValidator, validateRequest, getSingleLead);
router.post("/", leadBodyValidator, validateRequest, createLead);
router.put("/:id", [...leadIdValidator, ...leadBodyValidator], validateRequest, updateLead);
router.delete("/:id", leadIdValidator, validateRequest, authorizeRoles("admin"), deleteLead);

export default router;
