import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  const bearer = token?.split(" ");

  if (!token || !bearer[1]) {
    return res
      .status(403)
      .send({ error: "Token is required for this request." });
  }
  try {
    const decoded = jwt.verify(
      bearer[1],
      process.env.TOKEN_KEY || "small_and_useless_key"
    );
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ error: "The provided Token is invalid." });
  }
  return next();
};
