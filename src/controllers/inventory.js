import { updateDb, createDb, deleteDb, findDb, findOneDb } from "../libs/db";

import {
  successResponse,
  errorResponse,
  missingResponse,
} from "../utils/responses";

export const createInventory = async (req, res) => {
  try {
    const { book, quantity } = req.body;

    if (!quantity || quantity < 0)
      return missingResponse(res, {
        message: "Missing quantity, or quantity less than 0.",
      });

    if (!book)
      return missingResponse(res, {
        message: "Missing book identifier.",
      });

    const findBook = await findDb("books", {
      where: {
        id: Number(book),
      },
    });

    if (findBook?.error) {
      return errorResponse(res, findBook.error, findBook.status);
    }

    if (findBook?.length === 0) {
      return missingResponse(res, {
        message: `The choosen Book doesnt exists.`,
      });
    }

    const findInventory = await findDb("inventories", {
      where: {
        book: Number(book),
      },
    });

    if (findInventory?.length > 0) {
      return missingResponse(res, {
        message: `Already exists an inventory for this book.`,
      });
    }

    const newInventory = await createDb("inventories", {
      book,
      quantity,
    });

    return successResponse(res, newInventory);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await findOneDb("inventories", id);

    if (content.error) return errorResponse(res, content.error, content.status);

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getInventories = async (req, res) => {
  try {
    const { page, limit, search, order } = req.query;

    const content = await findDb("inventories", {
      page,
      limit,
      search,
      searchField: "name",
      orderBy: order ? order : "DESC",
    });

    if (content.error) return errorResponse(res, content.error, content.status);

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const addBookInventory = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    if (!quantity || quantity < 0)
      return missingResponse(res, {
        message: "Missing quantity, or quantity less than 1.",
      });

    const content = await findOneDb("inventories", id);

    if (content.error) return errorResponse(res, content.error, content.status);

    const updateInventory = await updateDb("inventories", id, {
      quantity: content.quantity + quantity,
    });

    if (updateInventory.error)
      return errorResponse(res, updateInventory.error, updateInventory.status);

    return successResponse(res, updateInventory);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const removeBookInventory = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    if (!quantity || quantity < 0)
      return missingResponse(res, {
        message: "Missing quantity, or quantity less than 1.",
      });

    const content = await findOneDb("inventories", id);

    if (content.error) return errorResponse(res, content.error, content.status);

    let finalQuantity;

    if (content.quantity === 0 || content.quantity - quantity <= 0) {
      finalQuantity = 0;
    } else {
      finalQuantity = content.quantity - quantity;
    }

    const updateInventory = await updateDb("inventories", id, {
      quantity: finalQuantity,
    });

    if (updateInventory.error)
      return errorResponse(res, updateInventory.error, updateInventory.status);

    return successResponse(res, updateInventory);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInventory = await deleteDb("inventories", id);

    if (deletedInventory.error)
      return errorResponse(
        res,
        deletedInventory.error,
        deletedInventory.status
      );

    return successResponse(res, { removed: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};
