'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
	avatar: {type: String, default: 'default.jpg'},
	current_address_id: {type: Number, default: 0},
    is_valid: {type: Number, default: 0},
	email: {type: String, default: ''},
	gift_amount: {type: Number, default: 3},
	city: String,
    register_time: String,
	id: Number,
	user_id: Number,
	mobile: {type: String, default: ''},
    integral: {type: Number, default: 0},
    like_count: {type: Number, default: 0},
	username: String,
    individual: String
})

userInfoSchema.index({id: 1});


const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo