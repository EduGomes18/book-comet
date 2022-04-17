import { readFile, writeFile, stat } from "fs/promises";
import path from "path";
const dbPath = path.join(__dirname, "../../db.json");
const firstId = 1564;

//* Here are the CRUD basic JSON database methods...

// Check if the Json database exists, if not, create one
export const checkIfExistDb = async () => {
  try {
    await stat(dbPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(dbPath, "");
    }
  }
};

// Count database to increment identifier
const countData = (collection, data) => {
  const hasId =
    typeof data[collection]?.[data[collection].length - 1]?.id === "number";
  return hasId
    ? data[collection]?.[data[collection].length - 1]?.id + 1
    : firstId;
};

// Save content into the database, based in collection and data received from controller
export const createDb = async (collection = "", data = {}) => {
  try {
    let dbData = await readFile(dbPath, "utf8");

    if (dbData?.length > 0) {
      dbData = JSON.parse(dbData);

      const dataToWrite = { id: countData(collection, dbData), ...data };

      if (dbData[collection]) {
        dbData = {
          ...dbData,
          [collection]: [...dbData[collection], dataToWrite],
        };
      } else {
        dbData = { ...dbData, [collection]: [dataToWrite] };
      }

      await writeFile(dbPath, JSON.stringify(dbData));

      return dataToWrite;
    } else {
      const dataToWrite = {
        [collection]: [{ id: firstId, ...data }],
      };

      await writeFile(dbPath, JSON.stringify(dataToWrite));
      return dataToWrite;
    }
  } catch (error) {
    console.log(error);
    throw error?.message || error;
  }
};

// Update content based in identifier
export const updateDb = async (collection = "", id = 0, data = {}) => {
  try {
    let dbData = await readFile(dbPath);

    const noContent = `Can't update ${collection}, not found, there's no content.`;

    if (dbData && dbData?.length > 0) {
      dbData = JSON.parse(dbData);

      if (dbData[collection]) {
        const dbContent = dbData[collection];
        if (dbContent.length === 0)
          return {
            status: 404,
            error: noContent,
          };

        const findItem = dbContent.find((item) => item.id === Number(id));

        if (!findItem)
          return {
            status: 404,
            error: `${collection} not found with id: ${id}`,
          };

        const updated = { ...findItem, ...data };

        const rewrited = dbContent.map((rewrite) => {
          if (rewrite.id === Number(id)) {
            return updated;
          } else return rewrite;
        });

        dbData = { ...dbData, [collection]: rewrited };

        await writeFile(dbPath, JSON.stringify(dbData));

        return updated;
      } else {
        return {
          status: 404,
          error: noContent,
        };
      }
    } else {
      return {
        status: 404,
        error: noContent,
      };
    }
  } catch (error) {
    console.log(error);
    throw error?.message || error;
  }
};

// Delete content based in identifier
export const deleteDb = async (collection = "", id = 0) => {
  try {
    let dbData = await readFile(dbPath);

    const noContent = `Can't remove ${collection}, not found, there's no content.`;

    if (dbData && dbData?.length > 0) {
      dbData = JSON.parse(dbData);

      if (dbData[collection]) {
        const dbContent = dbData[collection];
        if (dbContent.length === 0)
          return {
            status: 404,
            error: noContent,
          };

        const findItem = dbContent.find((item) => item.id === Number(id));

        if (!findItem)
          return {
            status: 404,
            error: `${collection} not found with id: ${id}`,
          };

        const rewrited = dbContent.filter(
          (rewrite) => rewrite.id !== Number(id)
        );

        dbData = { ...dbData, [collection]: rewrited };

        await writeFile(dbPath, JSON.stringify(dbData));

        return findItem;
      } else {
        return {
          status: 404,
          error: noContent,
        };
      }
    } else {
      return {
        status: 404,
        error: noContent,
      };
    }
  } catch (error) {
    console.log(error);
    throw error?.message || error;
  }
};

// List content from collection
export const findDb = async (collection = "", query = {}) => {
  try {
    let dbData = await readFile(dbPath);

    const noContent = `${collection}, not found, there's no content.`;

    if (dbData && dbData.length > 0) {
      dbData = JSON.parse(dbData);
      const getCollection = dbData[collection];
      if (!getCollection)
        return {
          status: 404,
          error: noContent,
        };

      const total = getCollection.length;

      const { limit, search, searchField, page, orderBy, where, join } = query;

      let finalLimit = 20;
      let offset = 0;

      if (limit) finalLimit = limit;
      if (page) offset = Math.round(((page - 1) * finalLimit) / total);

      let finalContent;

      if (where) {
        finalContent = getCollection.filter((content, ind) => {
          const whereKeys = Object.keys(where);
          const conditions = whereKeys.map((k) => content[k] === where[k]);
          if (conditions.every((e) => e === true)) {
            return true;
          } else return false;
        });
      } else if (search && searchField) {
        finalContent = getCollection.filter(
          (content, ind) =>
            content[searchField] &&
            content[searchField].includes(search) &&
            ind >= offset
        );
      } else {
        finalContent = getCollection.filter((id, ind) => ind >= offset);
      }

      if (!finalContent) throw 406;

      if (orderBy) {
        if (orderBy === "DESC") {
          finalContent = finalContent
            .sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0))
            .slice(0, limit);
        } else {
          finalContent = finalContent
            .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
            .slice(0, limit);
        }
      } else {
        finalContent = finalContent.slice(0, limit);
      }

      if (join) {
        const findJoinCollection = dbData[`${join}s`];
        if (!findJoinCollection || findJoinCollection.length === 0)
          return {
            error: `Error searching for ${join} collection, notFound`,
            status: 404,
          };

        finalContent = finalContent.map((cont) => ({
          ...cont,
          [join]: findJoinCollection.find((cl) => cl.id === cont[join]),
        }));
      }

      return finalContent;
    } else {
      return {
        status: 404,
        error: noContent,
      };
    }
  } catch (error) {
    throw error?.message || error;
  }
};

// List content from collection
export const findOneDb = async (collection = "", id = 0) => {
  try {
    let dbData = await readFile(dbPath);

    const noContent = `Can't find ${collection}, not found, there's no content.`;

    if (dbData && dbData?.length > 0) {
      dbData = JSON.parse(dbData);

      if (dbData[collection]) {
        const dbContent = dbData[collection];
        if (dbContent.length === 0)
          return {
            status: 404,
            error: noContent,
          };

        const findItem = dbContent.find((item) => item.id === Number(id));

        if (!findItem)
          return {
            status: 404,
            error: `${collection} not found with id: ${id}`,
          };

        return findItem;
      } else {
        return {
          status: 404,
          error: noContent,
        };
      }
    } else {
      return {
        status: 404,
        error: noContent,
      };
    }
  } catch (error) {
    console.log(error);
    throw error?.message || error;
  }
};
