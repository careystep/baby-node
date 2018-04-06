import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, isRequired: true},
    rating: {type: Number, default: 0},
    description: {type: String, default: ""},
    attrs: {type: Array, default: []},
    image_paths: {type: Array, default: []},
    rating_count: {type: Number, default: 0},
    price: {type: Number, default: 0},
    total: {type: Number, default: 0},
    tips: String
})

const ProductModel = mongoose.model('product',productSchema)

export default ProductModel;