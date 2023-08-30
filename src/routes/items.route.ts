import {Request, Response, Router} from 'express';
import Item from "../models/item";
import {StatusCodes} from "http-status-codes";


const itemsRoute: Router = Router();

itemsRoute.get(
  "/",
  async (req: Request, res: Response) => {
    try {
      const items = await Item.find();
      return res.status(StatusCodes.OK).json(items);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
)

itemsRoute.post(
  "/",
  async (req: Request, res: Response) => {
    const {id, title, status} = req.body;
    try {
      const existedItem = await Item.findOne({id: id})
      if (existedItem) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errorMsg: "Same ID is already existed"
        });
      } else {
        const item = new Item(
          {
            id: id,
            title: title,
            status: status
          }
        );
        await item.save();
        return res.status(StatusCodes.CREATED).json(item);
      }
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
)

itemsRoute.put(
  "/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const existedItem = await Item.findOne({id: req.body.id})
      if (existedItem) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errorMsg: "Same ID is already existed"
        });
      } else {
        const item = await Item.findOneAndUpdate(
          {id: id},
          {
            id: req.body.id,
            title: req.body.title,
            status: req.body.status
          });
        return res.status(StatusCodes.OK).send("Update Successfully");
      }
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
)

itemsRoute.delete(
  "/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const item = await Item.findOneAndDelete({id: id})
      if (item) {
        return res.status(StatusCodes.OK).send("Delete Successfully");
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send("Don't existed in Database")
      }

    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
)
export default itemsRoute;