
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

export { app };
