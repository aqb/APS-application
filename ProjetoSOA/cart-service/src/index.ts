import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";

import { createServer } from "http";

import { container } from "tsyringe";

import "./setup";

import App from "./app";

const PORT = process.env.PORT || 3333;

const app = createServer(container.resolve(App).getServer());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
