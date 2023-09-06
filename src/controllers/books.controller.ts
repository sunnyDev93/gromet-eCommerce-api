import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Book from '../models/book';

const getByPage = async (req: Request, res: Response) => {
  const title = <string>req.query.title || '';
  const page = parseInt(<string>req.query.page);
  const pageSize = parseInt(<string>req.query.pageSize);
  const startIndex = page * pageSize;
  const endIndex = (page + 1) * pageSize;
  const books = await Book.find();
  const filteredBooks = books.filter((book) => book.title.includes(title))
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  const totalPage = Math.ceil(books.length / pageSize);
  return res.status(StatusCodes.OK).json({paginatedBooks, totalPage});
}

const create = async (req: Request, res: Response) => {
  const {id, title, status, pdf, cover} = req.body;
  try {
    const existedBook = await Book.findOne({id: id})
    if (existedBook) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorMsg: "book is already existed"
      });
    } else {
      const book = new Book(
        {
          id: id,
          title: title,
          status: status,
          cover: cover,
          pdf: pdf
        }
      );
      await book.save();
      return res.status(StatusCodes.CREATED).json(book);
    }
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existedBook = await Book.findOne({id: req.body.id})
    if (existedBook && id !== req.body.id.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorMsg: "Same ID is already existed"
      });
    }
    await Book.findOneAndUpdate(
      {id: id},
      {
        id: req.body.id,
        title: req.body.title,
        status: req.body.status,
        cover: req.body.cover,
        pdf: req.body.pdf
      }
    );
    return res.status(StatusCodes.OK).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}



const booksController = {
  create,
  update,
  getByPage

}

export default booksController;