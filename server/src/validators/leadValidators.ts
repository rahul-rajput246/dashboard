import { body, param, query } from "express-validator";

export const leadBodyValidator = [
  body("name").trim().notEmpty().withMessage("Lead name is required"),
  body("email").isEmail().withMessage("Valid lead email is required"),
  body("status")
    .optional()
    .isIn(["New", "Contacted", "Qualified", "Lost"])
    .withMessage("Invalid status"),
  body("source")
    .isIn(["Website", "Instagram", "Referral"])
    .withMessage("Invalid source"),
];

export const leadQueryValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be at least 1"),
  query("status")
    .optional()
    .isIn(["New", "Contacted", "Qualified", "Lost"])
    .withMessage("Invalid status"),
  query("source")
    .optional()
    .isIn(["Website", "Instagram", "Referral"])
    .withMessage("Invalid source"),
  query("sort").optional().isIn(["latest", "oldest"]).withMessage("Invalid sort"),
];

export const leadIdValidator = [param("id").isMongoId().withMessage("Invalid lead id")];
