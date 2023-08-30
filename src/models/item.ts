import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IItem extends Document{
  id: number;
  title: string;
  status: string;
}

export interface IItemModel extends Model<IItem> {
}

const itemSchema: Schema = new Schema({
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
  }
}, { timestamps: true })

const Item = mongoose.model<IItem, IItemModel>('Item', itemSchema);

export default Item;
