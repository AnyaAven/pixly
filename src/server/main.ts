import { NotFoundError } from "./expressError.js";
import { Router } from "express";
import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser"

const app = express();
app.use(bodyParser.json());
app.use(ViteExpress.static());

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

ViteExpress.bind(app, server);

const router: Router = new (Router as any)(); // <-- TODO Research later a better solve

/** TEST HOME */
app.get("/", async function (req, res, next) {

  return res.json({ "KEY": "VALUE" });
});


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: any, req: any, res: any, next: any) { // <-- TODO add typing
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status= err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export { app };
