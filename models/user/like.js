import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user_id: Number,
    baby_id: String,
})

const LikeModel = mongoose.model('likes',likeSchema)

export default LikeModel;