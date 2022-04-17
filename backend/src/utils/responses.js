export const successResponse = (res, body) => {
  return res.status(200).send(body);
};

export const missingResponse = (res, body) => {
  return res.status(400).send(body);
};

export const errorResponse = (res, error, status) => {
  return res
    .status(status ? status : typeof error === "number" ? error : 500)
    .send({ error: errorMessage(error) });
};

const errorMessage = (error) => {
  let message = error?.message || error || "";

  if (typeof error === "number") {
    switch (error) {
      case 404:
        message = "Content not found.";
        break;
      case 406:
        message = "No results for the asked content.";
        break;
    }
  }

  return message;
};
