import mongoose, {Document, Schema, Model} from 'mongoose';

export interface IProduct extends Document {
    field_id: string,
    product_code?: Array < string >,
    item_name?: string,
    product_name_model?: Array < string >,
    variations?: Array < string >,
    meta_description?: string,
    prosireni_opis?: string,
    unit_of_measure?: string,
    item_category?: string,
    subcategory?: string,
    subcategory_list?: string,
    minimum_pack?: string,
    transport_packaging?: string,
    volume?: string,
    square_footage?: string,
    width?: string,
    length?: string,
    height?: string,
    ancestor?: string,
    thickness?: string,
    weight?: string,
    composition?: string,
    color?: string,
    sticker?: Array < string >,
    qr_kod?: string,
    images?: string,
    model_more_images?: string,
    url?: string,
    technical_drawing?: string,
    resistance_type?: string,
    guarantee?: string,
    lifetime?: string,
    certificate?: string,
    place_and_method_of_storage?: string,
    package_dimensions?: string,
    prateca_oprema_dodaci?: string,
    additional_notes?: string,
    application_places?: string,
    installation_mode?: string,
    article_code: Schema.Types.String,
    sold_cnt?: number,
    vp_price?: number,
    net_price?: number,
    stock?: number
}

export interface IProductModel extends Model < IProduct > {}

const productSchema: Schema = new Schema({
    field_id: {
        type: String,
        required: true
    },
    product_code: {
        type: Array,
        default: null
    },
    item_name: {
        type: String,
        default: null
    },
    product_name_model: {
        type: String,
        default: null
    },
    variations: {
        type: Array,
        default: null
    },
    meta_description: {
        type: String,
        default: null
    },
    prosireni_opis: {
        type: String,
        default: null
    },
    unit_of_measure: {
        type: String,
        default: null
    },
    item_category: {
        type: String,
        default: null
    },
    subcategory: {
        type: String,
        default: null
    },
    subcategory_list: {
        type: String,
        default: null
    },
    minimum_pack: {
        type: String,
        default: null
    },
    transport_packaging: {
        type: String,
        default: null
    },
    volume: {
        type: String,
        default: null
    },
    square_footage: {
        type: String,
        default: null
    },
    width: {
        type: String,
        default: null
    },
    length: {
        type: String,
        default: null
    },
    height: {
        type: String,
        default: null
    },
    ancestor: {
        type: String,
        default: null
    },
    thickness: {
        type: String,
        default: null
    },
    weight: {
        type: String,
        default: null
    },
    composition: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
    sticker: {
        tyep: Array
    },
    qr_kod: {
        type: String,
        default: null
    },
    images: {
        type: String,
        default: null
    },
    model_more_images: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    technical_drawing: {
        type: String,
        default: null
    },
    resistance_type: {
        type: String,
        default: null
    },
    guarantee: {
        type: String,
        default: null
    },
    lifetime: {
        type: String,
        default: null
    },
    certificate: {
        type: String,
        default: null
    },
    place_and_method_of_storage: {
        type: String,
        default: null
    },
    package_dimensions: {
        type: String,
        default: null
    },
    prateca_oprema_dodaci: {
        type: String,
        default: null
    },
    additional_notes: {
        type: String,
        default: null
    },
    application_places: {
        type: String,
        default: null
    },
    installation_mode: {
        type: String,
        default: null
    },
    sold_cnt: {
        type: Number,
        default: null
    },
    vp_price: {
        type: Number,
        default: null
    },
    net_price: {
        type: Number,
        default: null
    },
    stock: {
        type: Number,
        default: null
    },
    article_code: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }
}, {timestamps: true})

const Product = mongoose.model<IProduct, IProductModel>('Product', productSchema);

export default Product;
