import express from "express";

import routes from "./routes";
import books from "./routes/books";
import authors from "./routes/authors";
import inventories from "./routes/inventories";
import { checkIfExistDb } from "./libs/db";

checkIfExistDb();
const app = express();
app.use(express.json());
app.use("/", routes);
app.use("/book", books);
app.use("/author", authors);
app.use("/inventory", inventories);

export default app;
