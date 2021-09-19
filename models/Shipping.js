const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    statusOrder: {
        type: String,
        required: true,
        default: "not verify"
    },
    cart: {
        type:[{ type: Schema.Types.ObjectId, ref: 'cart' }],
        required: true 
    },
}, { timestamps: true });

const Shipping = mongoose.model("shipping", shippingSchema);

module.exports = Shipping;
