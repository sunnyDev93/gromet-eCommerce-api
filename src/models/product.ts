import mongoose, {Document, Schema, Model} from 'mongoose';

export interface IProduct extends Document {
    field_id: string,
    product_code: Array < string >,
    item_name: string,
    product_name_model: Array < string >,
    variations: Array < string >,
    meta_description: string,
    prosireni_opis: string,
    unit_of_measure: string,
    item_category: string,
    subcategory: string,
    subcategory_list: string,
    minimum_pack: string,
    transport_packaging: string,
    volume: string,
    square_footage: string,
    width: string,
    length: string,
    height: string,
    ancestor: string,
    thickness: string,
    weight: string,
    composition: string,
    color: string,
    sticker: Array < string >,
    qr_kod: string,
    images: string,
    model_more_images: string,
    url: string,
    technical_drawing: string,
    resistance_type: string,
    guarantee: string,
    lifetime: string,
    certificate: string,
    place_and_method_of_storage: string,
    package_dimensions: string,
    prateca_oprema_dodaci: string,
    additional_notes: string,
    application_places: string,
    installation_mode: string,
    article_code: Schema.Types.String,
    sold_cnt: number,
    vp_price: number,
    net_price: number,
    stock: number
}

export interface IProductModel extends Model < IProduct > {}

const productSchema: Schema = new Schema({
    field_id: {
        type: String,
        required: true
    },
    product_code: {
        type: Array
    },
    item_name: {
        type: String
    },
    product_name_model: {
        type: String
    },
    variations: {
        type: Array
    },
    meta_description: {
        type: String
    },
    prosireni_opis: {
        type: String
    },
    unit_of_measure: {
        type: String
    },
    item_category: {
        type: String
    },
    subcategory: {
        type: String
    },
    subcategory_list: {
        type: String
    },
    minimum_pack: {
        type: String
    },
    transport_packaging: {
        type: String
    },
    volume: {
        type: String
    },
    square_footage: {
        type: String
    },
    width: {
        type: String
    },
    length: {
        type: String
    },
    height: {
        type: String
    },
    ancestor: {
        type: String
    },
    thickness: {
        type: String
    },
    weight: {
        type: String
    },
    composition: {
        type: String
    },
    color: {
        type: String
    },
    sticker: {
        tyep: Array
    },
    qr_kod: {
        type: String
    },
    images: {
        type: String
    },
    model_more_images: {
        type: String
    },
    url: {
        type: String
    },
    technical_drawing: {
        type: String
    },
    resistance_type: {
        type: String
    },
    guarantee: {
        type: String
    },
    lifetime: {
        type: String
    },
    certificate: {
        type: String
    },
    place_and_method_of_storage: {
        type: String
    },
    package_dimensions: {
        type: String
    },
    prateca_oprema_dodaci: {
        type: String
    },
    additional_notes: {
        type: String
    },
    application_places: {
        type: String
    },
    installation_mode: {
        type: String
    },
    sold_cnt: {
        type: Number
    },
    vp_price: {
        type: Number
    },
    net_price: {
        type: Number
    },
    stock: {
        type: Number
    },
    article_code: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }
}, {timestamps: true})

const Product = mongoose.model<IProduct, IProductModel>('Product', productSchema);

export default Product;
