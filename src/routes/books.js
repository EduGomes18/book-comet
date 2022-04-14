import express from "express";
const router = express.Router();

import { getBookById, createBook } from "../controllers/book";

router.get("/:id", getBookById);
router.post("/", createBook);

export default router;
