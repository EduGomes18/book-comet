import express from "express";

import routes from "./routes";
import books from "./routes/books.js";

const app = express();

app.use(express.json());
app.use("/", routes);
app.use("/book", books);

export default app;
