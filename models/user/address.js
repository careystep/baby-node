'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const addressSchema = new Schema({
	id: Number,
	phone: String,
	user_id: Number,
	created_at: {type: Date, default: Date.now()},
	phone_bk: String,
	name: String,
    region: {type: Array,default: ['','','']},
	address_detail: String,
	sex: {type: Number, default: 1},
	is_user_default: {type: Boolean, default: true},
})

addressSchema.index({id: 1});

const Address = mongoose.model('Address', addressSchema);

export default Address