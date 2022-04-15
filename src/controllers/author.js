import { updateDb, createDb, deleteDb, findDb, findOneDb } from "../libs/db";

import {
  successResponse,
  errorResponse,
  missingResponse,
} from "../utils/responses";

export const createAuthor = async (req, res) => {
  try {
    const { name, surname } = req.body;

    if (!name || name?.length < 2 || !surname || surname?.length < 2)
      return missingResponse(res, {
        message:
          "Missing name or surname, also check if both length isnt less than 2",
      });

    const newAuthor = await createDb("authors", {
      name,
      surname,
    });

    return successResponse(res, newAuthor);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await findOneDb("authors", id);

    if (content.error) return errorResponse(res, content.error, content.status);

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAuthors = async (req, res) => {
  try {
    const { page, limit, search, order } = req.query;

    const content = await findDb("authors", {
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

export const updateAuthor = async (req, res) => {
  try {
    const { name, surname } = req.body;
    const { id } = req.params;

    if (!name || name?.length < 2 || !surname || surname?.length < 2)
      return missingResponse(res, {
        message:
          "Missing name or surname, also check if both length isnt less than 2",
      });

    const updateAuthor = await updateDb("authors", id, {
      name,
      surname,
    });

    if (updateAuthor.error)
      return errorResponse(res, updateAuthor.error, updateAuthor.status);

    return successResponse(res, updateAuthor);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAuthor = await deleteDb("authors", id);

    if (deletedAuthor.error)
      return errorResponse(res, deletedAuthor.error, deletedAuthor.status);

    return successResponse(res, { removed: true });
  } catch (error) {
    return errorResponse(res, error);
  }
};
