import { updateDb, createDb, deleteDb, findDb, findOneDb } from "../libs/db";

import {
  successResponse,
  errorResponse,
  missingResponse,
} from "../utils/responses";

export const createBook = async (req, res) => {
  try {
    const {
      title,
      description,
      keywords,
      author,
      publisher,
      type,
      extension,
      publishedYear,
      summary,
    } = req.body;

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

    const findAuthor = await findDb("authors", {
      where: {
        id: Number(author),
      },
    });

    if (findAuthor?.error) {
      return errorResponse(res, findAuthor.error, findAuthor.status);
    }

    if (findAuthor?.length === 0) {
      return missingResponse(res, {
        message: `The choosen Author doesnt exists.`,
      });
    }

    const exists = await findDb("books", {
      where: {
        title,
        author,
      },
    });

    if (exists.length > 0) {
      return missingResponse(res, {
        message: `Book width title ${title}, and author ${author} already exists`,
      });
    }

    const newBook = await createDb("books", {
      title,
      description,
      keywords,
      author: Number(author),
      publisher,
      type,
      extension,
      publishedYear,
      summary,
      created_at: new Date(),
      updated_at: new Date(),
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
      join: [
        { field: "author", collection: "authors" },
        { field: "inventory", collection: "inventories", relation: "book" },
      ],
      orderBy: order ? order : "DESC",
    });

    if (content.error) return errorResponse(res, content.error, content.status);

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateBook = async (req, res) => {
  try {
    const {
      title,
      description,
      keywords,
      author,
      publisher,
      type,
      publishedYear,
      extension,
      summary,
    } = req.body;
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
      author: Number(author),
      publisher,
      type,
      extension,
      publishedYear,
      summary,
      updated_at: new Date(),
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

    const findInventory = await findDb("inventories", {
      where: {
        book: Number(id),
      },
    });

    if (findInventory.data.length > 0 && findInventory.data[0].quantity > 0) {
      return missingResponse(res, {
        message:
          "Canot delete book, the book has inventory with quantity positive.",
      });
    }

    const deletedBook = await deleteDb("books", id);

    if (deletedBook.error)
      return errorResponse(res, deletedBook.error, deletedBook.status);

    if (findInventory?.data[0]?.id) {
      const removeInventory = findInventory?.data?.map(async (inv) => {
        const deleteInventory = await deleteDb("inventories", inv.id);
        if (deleteInventory.error)
          return errorResponse(
            res,
            deleteInventory.error,
            deleteInventory.status
          );
      });

      await Promise.all(removeInventory);
    }

    return successResponse(res, { removed: true });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};
