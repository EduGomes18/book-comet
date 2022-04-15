import treatFields from "../utils/treatFields";
import { errorResponse } from "../utils/responses";

export const validateBookReq = (req, res, next) => {
  try {
    const bodies = Object.keys(req.body);
    const { body } = req;
    const { id } = req.params;

    if (id) {
      treatFields("identifier", "number", id);
    }

    if (bodies.length > 0) {
      bodies.map((q) => {
        switch (q) {
          case "title":
            treatFields(q, "string", body[q]);
            break;
          case "description":
            treatFields(q, "string", body[q]);
            break;
          case "author":
            treatFields(q, "string", body[q]);
            break;
          case "publisher":
            treatFields(q, "string", body[q]);
            break;
          case "keywords":
            treatFields(q, "array", body[q]);
            break;
          case "type":
            treatFields(q, "enum", body[q], ["ebook", "book"]);
            break;
          case "extension":
            treatFields(q, "enum", body[q], ["PDF", "EPUB"]);
            break;
        }
      });
      next();
    } else {
      next();
    }
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

export const validateBookQuery = (req, res, next) => {
  try {
    const queries = Object.keys(req.query);
    const { query } = req;
    const { id } = req.params;

    if (id) {
      treatFields("identifier", "number", id, true);
    }

    if (queries.length > 0) {
      queries.map((q) => {
        switch (q) {
          case "page":
            treatFields(q, "number", query[q]);
            break;
          case "limit":
            treatFields(q, "number", query[q]);
            break;
          case "search":
            treatFields(q, "string", query[q]);
            break;
          case "order":
            treatFields(q, "string", query[q]);
            break;
        }
      });
      next();
    } else {
      next();
    }
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};
