import express from "express";
const router = express.Router();

import {
  getAuthorById,
  createAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author";

import { validateAuthorQuery, validateAuthorReq } from "../middlewares/author";
import { verifyToken } from "../middlewares/auth";

router.get("/", verifyToken, validateAuthorQuery, getAuthors);
router.get("/:id", verifyToken, validateAuthorQuery, getAuthorById);
router.post("/", verifyToken, validateAuthorReq, createAuthor);
router.delete("/:id", verifyToken, validateAuthorReq, deleteAuthor);
router.put("/:id", verifyToken, validateAuthorReq, updateAuthor);

export default router;
