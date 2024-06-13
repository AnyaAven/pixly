import { NotFoundError } from "./expressError.js";
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

// typeorm
import "reflect-metadata";
// Initialize ORM
import { AppDataSource } from "db/data-source.js";
AppDataSource.initialize();

const app = express();
app.use(bodyParser.json());
app.use(ViteExpress.static());

/** ROUTES *********************************************************/
import imagesRoutes from "./routes/images.js"
app.use("/images", imagesRoutes);

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

ViteExpress.bind(app, server); //TODO does this auto handle cors? prob

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: any, req: any, res: any, next: any) { // <-- TODO add typing
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});


export { app };
