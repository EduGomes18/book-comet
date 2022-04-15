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

router.get("/", validateBookQuery, getBooks);
router.get("/:id", validateBookQuery, getBookById);
router.post("/", validateBookReq, createBook);
router.delete("/:id", validateBookReq, deleteBook);
router.put("/:id", validateBookReq, updateBook);

export default router;
