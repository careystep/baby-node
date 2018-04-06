import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user_id: Number,
    avatar: String,
    username: String,
    baby_id: String,
    content: String,
    created_at: {type: Date, default: Date.now()},
})

const CommentModel = mongoose.model('comments',commentSchema)

export default CommentModel;