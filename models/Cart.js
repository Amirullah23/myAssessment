const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product: {
        type:[{ type: Schema.Types.ObjectId, ref: 'products' }],
        required: true 
    },
    user: {
        type:[{ type: Schema.Types.ObjectId, ref: 'users' }],
        required: true 
    },
    status: {
        type: String,
        required: true,
        default: "not yet paid"
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},{ timestamps: true });

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
