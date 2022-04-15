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

router.get("/", validateInventoryQuery, getInventories);
router.get("/:id", validateInventoryQuery, getInventoryById);
router.post("/", validateInventoryReq, createInventory);
router.delete("/:id", validateInventoryReq, deleteInventory);
router.put("/add/:id", validateInventoryReq, addBookInventory);
router.put("/remove/:id", validateInventoryReq, removeBookInventory);

export default router;
