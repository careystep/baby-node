import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    user: String,
    password: String,
    id: Number,
    create_time: String,
    admin: {type: String, default: '管理员'},
    status: Number,  //1:普通管理、 2:超级管理员
    avatar: {type: String, default: 'default.jpg'},
    city: String,
});

const AdminModel = mongoose.model('admin',adminSchema);

export default AdminModel;