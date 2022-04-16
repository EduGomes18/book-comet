import express from "express";
const router = express.Router();

import {
  getUserMe,
  createUser,
  auth,
  updateUser,
} from "../controllers/authentication";

import {
  validateInventoryReq,
  validateInventoryQuery,
} from "../middlewares/inventory";

router.get("/me", validateInventoryQuery, getUserMe);
router.post("/", validateInventoryReq, auth);
router.post("/register", validateInventoryReq, createUser);
router.put("/:id", validateInventoryReq, updateUser);

export default router;
