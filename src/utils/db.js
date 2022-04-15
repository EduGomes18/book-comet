import { readFile, writeFile, stat } from "fs/promises";
import path from "path";

const dbPath = path.join(__dirname, "../../db.json");
const firstId = 1564;

export const checkIfExistDb = async () => {
  console.log("Rodei --");
  try {
    await stat(dbPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(dbPath, "");
    }
  }
};

const countData = (collection, data) => {
  const hasId =
    typeof data[collection]?.[data[collection].length - 1]?.id === "number";
  return hasId
    ? data[collection]?.[data[collection].length - 1]?.id + 1
    : firstId;
};

export const createDb = async (collection, data) => {
  await checkIfExistDb();

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
    throw error.message;
  }
};

export const updateDb = async (collection, data) => {
  try {
    let dbData = await readFile(dbPath);

    if (data) {
      dbData = JSON.parse(data);

      if (dbData[collection]) {
        dbData = { ...dbData, [collection]: [...dbData[collection], data] };
      } else {
        dbData = { ...dbData, [collection]: [data] };
      }

      await writeFile(dbPath, JSON.parse(dbData));
    } else {
    }
  } catch (error) {
    throw error.message;
  }
};

export const deleteDb = async (collection, data) => {
  // ler o arquivo

  // criar caso nao existea

  console.log("Colecao", collection);
  // ler e reescrever
  //

  await checkIfExistDb();

  try {
    let dbData = await readFile(dbPath);

    if (data) {
      dbData = JSON.parse(data);

      if (dbData[collection]) {
        dbData = { ...dbData, [collection]: [...dbData[collection], data] };
      } else {
        dbData = { ...dbData, [collection]: [data] };
      }

      await writeFile(dbPath, JSON.parse(dbData));
    } else {
    }
  } catch (error) {
    throw error.message;
  }
};

export const listDb = async (collection) => {
  try {
    let dbData = await readFile(dbPath);

    if (data) {
      dbData = JSON.parse(data);

      if (dbData[collection]) {
        dbData = { ...dbData, [collection]: [...dbData[collection], data] };
      } else {
        dbData = { ...dbData, [collection]: [data] };
      }

      await writeFile(dbPath, JSON.parse(dbData));
    } else {
    }
  } catch (error) {
    throw error.message;
  }
};
