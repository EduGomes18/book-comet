import express from "express";
const router = express.Router();

import {
  getBookById,
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/book";

import { validateBookQuery, validateBookReq } from "../middlewares/book";
import { verifyToken } from "../middlewares/auth";

router.get("/", verifyToken, validateBookQuery, getBooks);
router.get("/:id", verifyToken, validateBookQuery, getBookById);
router.post("/", verifyToken, validateBookReq, createBook);
router.delete("/:id", verifyToken, validateBookReq, deleteBook);
router.put("/:id", verifyToken, validateBookReq, updateBook);

export default router;
