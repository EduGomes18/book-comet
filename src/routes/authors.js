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

router.get("/", validateAuthorQuery, getAuthors);
router.get("/:id", validateAuthorQuery, getAuthorById);
router.post("/", validateAuthorReq, createAuthor);
router.delete("/:id", validateAuthorReq, deleteAuthor);
router.put("/:id", validateAuthorReq, updateAuthor);

export default router;
