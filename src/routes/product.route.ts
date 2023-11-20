import {Router} from "express";
import {Request, Response} from 'express';

import productsController from "../controllers/products.controller";
import {verifyToken} from "../middlewares/auth.middleware";


const productsRoute: Router = Router();

productsRoute.get("/:category", verifyToken, productsController.getByCategory);

productsRoute.get("/", verifyToken, productsController.getByPage);
productsRoute.post("/", verifyToken, productsController.create);
productsRoute.put("/:id", verifyToken, async (req : Request, res : Response) => {
    await productsController.update(req, res);
});
productsRoute.delete("/:id", async (req : Request, res : Response) => {
    await productsController.deleteBook(req, res);
});

productsRoute.delete("/bulk/byIDs", productsController.deleteBooks);

productsRoute.patch("/bulk/approve/byIDs", verifyToken, async (req : Request, res : Response) => {
    await productsController.approveBooks(req, res);
});

productsRoute.get("/published-by-month", verifyToken, productsController.publishedBooksByMonth);

productsRoute.get("/published-by-daily", verifyToken, productsController.publishedBooksByDaily);

productsRoute.patch("/bulk/reject/byIDs", verifyToken, productsController.rejectBooks);
export default productsRoute;
