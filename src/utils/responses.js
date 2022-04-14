export const successResponse = (res, body) => {
  return res.status(200).send(body);
};

export const missingResponse = (res, body) => {
  return res.status(400).send(body);
};

export const errorResponse = (res, statusCode, error) => {
  const msg = error.message || error || "";

  return res.status(statusCode).send({ error: msg });
};
