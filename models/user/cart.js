'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const cartSchema = Schema({
	id: Number,
	cart: {
		id: Number,
		groups: [
			[
				{
					attrs: [],
					extra: [],
					id: Number,
					new_specs: [],
					name: String,
					price: Number,
					quantity: Number,
					specs: [String],
					packing_fee: Number,
					sku_id: Number,
					stock: Number,
				}
			]
		],
		deliver_amount: Number,
		deliver_time: String,
		discount_amount: String,
		total: Number,
		user_id: Number,
	},
	current_address: {},
})

cartSchema.index({id: 1});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart