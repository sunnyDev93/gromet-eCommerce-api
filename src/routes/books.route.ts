import { Router } from "express";
import { Request, Response } from 'express';

import booksController from "../controllers/books.controller";


const booksRoute: Router = Router();

booksRoute.get("/", booksController.getByPage);
booksRoute.post("/", booksController.create);
booksRoute.put("/:id", async (req: Request, res: Response) => {
  await booksController.update(req, res);
});

export default booksRoute;