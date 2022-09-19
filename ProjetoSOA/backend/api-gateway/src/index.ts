import "dotenv/config";
import "express-async-errors";

import { createServer } from "http";

import App from "./app";

const PORT = process.env.PORT || 3333;

const app = createServer(new App().getServer());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
