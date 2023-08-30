import express from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import { mongoURI, port } from "./config";
import itemsRoute from "./routes/items.route";

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected successfully"))
  .catch((err) => {
    console.log("mongooseErr=> ", err);
  })

const app = express();
app.use(json());
app.use(urlencoded({
  extended: true
}));
app.use(cors())

app.use("/api/items", itemsRoute);
const server = app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
});

export default server;

