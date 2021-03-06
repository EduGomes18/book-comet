import express from "express";
import cors from "cors";
import routes from "./routes";
import books from "./routes/books";
import authors from "./routes/authors";
import authentication from "./routes/authentication";
import inventories from "./routes/inventories";
import { checkIfExistDb } from "./libs/db";
import * as dotenv from "dotenv";
dotenv.config();

checkIfExistDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", routes);
app.use("/auth", authentication);
app.use("/book", books);
app.use("/author", authors);
app.use("/inventory", inventories);

export default app;
