import { updateDb, createDb, deleteDb, findDb, findOneDb } from "../libs/db";

import {
  successResponse,
  errorResponse,
  missingResponse,
} from "../utils/responses";

export const createBook = async (req, res) => {
  try {
    const { title, description, keywords, author, publisher, type, extension } =
      req.body;

    if (!title || !description || !type)
      return missingResponse(res, {
        message: "Missing field, check for: title, description, type.",
      });

    if (type === "ebook") {
      if (!extension)
        return missingResponse(res, {
          message: "Ebook type needs extension field.",
        });
    }

    const newBook = await createDb("books", {
      title,
      description,
      keywords,
      author,
      publisher,
      type,
      extension,
    });

    return successResponse(res, newBook);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await findOneDb("books", id);

    if (content.error) return errorResponse(res, content.error, content.status);

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getBooks = async (req, res) => {
  try {
    const { page, limit, search, order } = req.query;

    const content = await findDb("books", {
      page,
      limit,
      search,
      searchField: "title",
      orderBy: order ? order : "DESC",
    });

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, description, keywords, author, publisher, type } = req.body;
    const { id } = req.params;

    if (!title || !description || !type)
      return missingResponse(res, {
        message: "Missing field, check for: title, description, type",
      });

    if (type === "ebook") {
      if (!extension)
        return missingResponse(res, {
          message: "Ebook type needs extension field.",
        });
    }

    const updatedBook = await updateDb("books", id, {
      title,
      description,
      keywords,
      author,
      publisher,
      type,
      extension,
    });

    if (updatedBook.error)
      return errorResponse(res, updatedBook.error, updatedBook.status);

    return successResponse(res, updatedBook);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await deleteDb("books", id);

    if (deletedBook.error)
      return errorResponse(res, deletedBook.error, deletedBook.status);

    return successResponse(res, { removed: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};
