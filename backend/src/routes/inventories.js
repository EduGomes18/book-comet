import express from "express";
const router = express.Router();

import {
  getInventoryById,
  createInventory,
  getInventories,
  addBookInventory,
  removeBookInventory,
  deleteInventory,
} from "../controllers/inventory";

import {
  validateInventoryReq,
  validateInventoryQuery,
} from "../middlewares/inventory";

import { verifyToken } from "../middlewares/auth";

router.get("/", verifyToken, validateInventoryQuery, getInventories);
router.get("/:id", verifyToken, validateInventoryQuery, getInventoryById);
router.post("/", verifyToken, validateInventoryReq, createInventory);
router.delete("/:id", verifyToken, validateInventoryReq, deleteInventory);
router.put("/add/:id", verifyToken, validateInventoryReq, addBookInventory);
router.put(
  "/remove/:id",
  verifyToken,
  validateInventoryReq,
  removeBookInventory
);

export default router;
