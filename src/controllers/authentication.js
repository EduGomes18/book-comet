import { updateDb, createDb, findDb, findOneDb } from "../libs/db";
import { validateEmail } from "../utils/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  successResponse,
  errorResponse,
  missingResponse,
} from "../utils/responses";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    const validate = (field, length) => {
      return missingResponse(res, {
        message: `Missing ${field} or it length is less than ${length}.`,
      });
    };

    if (!validateEmail(email))
      return missingResponse(res, {
        message: `Invalid E-mail.`,
      });

    if (!password || password?.length < 6) validate("email", 6);
    if (!firstName || firstName?.length < 2) validate("firstName", 2);

    const findUser = await findDb("users", {
      where: {
        email: email,
      },
    });

    if (findUser?.length === 0) {
      return missingResponse(res, {
        message: `User already registered with this e-mail.`,
      });
    }

    const encryptedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = await createDb("users", {
      firstName: firstName.trim(),
      lastName,
      email: email.trim().toLowerCase(),
      password: encryptedPassword,
    });

    return successResponse(res, newUser);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const auth = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!validateEmail(email))
      return missingResponse(res, {
        message: `Invalid E-mail.`,
      });

    if (!password || password?.length < 6)
      return missingResponse(res, {
        message: `Missing Password or it length is less than 6.`,
      });

    const findUser = await findDb("users", {
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (findUser.error)
      return errorResponse(res, findUser.error, findUser.status);

    if (
      findUser?.length > 0 &&
      (await bcrypt.compare(password, findUser[0].password))
    ) {
      const token = jwt.sign(
        { user_id: findUser[0].id, email },
        process.env.TOKEN_KEY || "small_and_useless_key",
        {
          expiresIn: "12d",
        }
      );
      const saveToken = { ...findUser[0], token };

      const authenticatedUser = await updateDb(
        "users",
        saveToken.id,
        saveToken
      );

      return successResponse(res, authenticatedUser);
    } else {
      return missingResponse(res, {
        message: `Invalid credentials.`,
      });
    }
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getUserMe = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await findOneDb("inventories", id);

    if (content.error) return errorResponse(res, content.error, content.status);

    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateUser = async (req, res) => {
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
