const { Cart, Products, Users } = require("../../models");
const { findById } = require("../../models/Users");

module.exports = {
    getAll: async (req, res) => {
        try {
            const user = await Users.findById(req.body.userId);
            const product = await Products.findById(req.body.productId);


            const result = await Cart.find({}).populate("user").populate("product");

            res.status(200).json({ message: "Show data Products", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    addOne: async (req, res) => {
        try {
            const user = await Users.findById(req.body.userId);
            const product = await Products.findById(req.body.productId);
            

            const model = new Cart({
                ...req.body,...{user: user._id, product:product._id},
            })
            console.log("inp",model)
            // const result = await Users.findOne({email: req.body.email})
            model.save(function (err) {
                if (err) return handleError(err);
                // that's it!
              });

            res.status(200).json({ message: "Add new Products", data: model });
        } catch (error) {
            console.log(error);
        }
    }
};
