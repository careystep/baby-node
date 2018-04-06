import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    user_id: Number,
    user:{type:String},
    password:{type:String}

});

const UserModel =  mongoose.model("User",userSchema);

export default UserModel;


