import { updateDb, createDb, deleteDb, listDb } from "../utils/db";
import {
  successResponse,
  errorResponse,
  missingResponse,
} from "../utils/responses";

export const createBook = async (req, res) => {
  try {
    const { title, description, keywords } = req.body;

    if (!title || !description)
      return missingResponse(res, { message: "Missing title or description" });

    const newBook = await createDb("books", { title, description, keywords });

    return successResponse(res, newBook);
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  res.status(201).send(`Requisição recebida com sucesso ${id}`);
};
