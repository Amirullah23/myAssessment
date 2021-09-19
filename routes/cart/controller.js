const { Cart, Products, Users } = require("../../models");


module.exports = {
    getAll: async (req, res) => {
        try {

            const result = await Cart.find({}).populate("user").populate("product");

            res.status(200).json({ message: "Show data cart", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    addOne: async (req, res) => {
        try {
            const user = await Users.findOne({email: req.body.email});
            const product = await Products.findById(req.body.productId);
            if(user == null || product == null) {
                res.status(404).json({ message: "Invalid Account or product"});
            } else{
                if(product.quantity == 0){
                    return  res.status(404).json({ message: "Product not available"});
                } else if(product.quantity < req.body.quantity){
                    console.log("in")
                    return  res.status(404).json({ message: "Product quantity not enough"});
                }
                let price = product.price * req.body.quantity;
                let inp = {user: user._id, product:product._id, price: price, ...req.body}
        
            const model = new Cart(inp)
            model.save(function (err) {
                if (err) return handleError(err);
              });

            res.status(200).json({ message: "Add new cart", data: model, infoPayment: `please transfer based on the amount your order: name : Amir, no: 8735089123, Bank: BCA` });
            }
        } catch (error) {
            console.log(error);
        }
    },
    pay: async (req, res) => {
        try {
            const model = await Cart.updateOne({ _id: req.body.cartId }, { status: "already paid" });
            model.n;
            model.nModified;
            res.status(200).json({ message: "update payment",data: model});
          
        } catch (error) {
            console.log(error);
        }
    }
};
