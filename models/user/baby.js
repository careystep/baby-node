import mongoose from 'mongoose';

const goodsSchema = new mongoose.Schema({
    user_id: Number,
    name: {type: String, isRequired: true},
    rating: {type: Number, default: 0},
    hot: {type: Number, default: 0},
    description: {type: String, default: "没有介绍"},
    created_at: {type: Date, default: Date.now()},
    tag: {type: Array, default: []},
    image_paths: {type: Array, default: []},
    rating_count: {type: Number, default: 0},
})

const BabyModel = mongoose.model('goods',goodsSchema)

export default BabyModel;