import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBook extends Document{
  id: number;
  title: string;
  status: string;
  cover: string;
  pdf: string;
}

export interface IBookModel extends Model<IBook> {
}

const bookSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);

export default Book;
