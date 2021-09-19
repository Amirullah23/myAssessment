const { Shipping, Cart, Products, Users } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await Shipping.find({}).populate({
                path: 'cart',
                populate: { path: 'product'}
              }).populate({
                path: 'cart',
                populate: { path: 'user'}
              });
            res.status(200).json({ message: "Show data shipping", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    getByShiipId: async (req, res) => {
        try {
            const result = await Shipping.findById(req.params.shiipId).populate({
                path: 'cart',
                populate: { path: 'product'}
              }).populate({
                path: 'cart',
                populate: { path: 'user'}
              });
            res.status(200).json({ message: "Show data shipping", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    addOne: async (req, res) => {
        try {
            let findCart = await Cart.find({_id: req.body.cartId}).populate("user").populate("product")
            console.log("the cart ",findCart)
            if (findCart == null) {
                return res.status(200).json({ message: "Cannot find cart!!!" });
            }
            let inp = {
                cart: findCart,
                ...req.body
            }

            const model = new Shipping(inp)
            model.save(function (err) {
                if (err) return console.log(err);
            });

            res.status(200).json({ message: "Add new shipping", data: model });
        } catch (error) {
            console.log(error);
        }
    },
    submit: async (req, res) => {
        try {
            const findCart = await Cart.find({_id: req.body.cartId}).populate("user").populate("product");
            //search id product
            let id = findCart[0].product[0]._id
            let pQuantity = findCart[0].product[0].quantity
            let OQuantity = findCart[0].quantity
            //check if the product available
            if(pQuantity< OQuantity){
                return res.status(200).json({ message: "product not available"});
            }else{
            //reduce quantity
            let inp =  pQuantity - OQuantity
            
            const model = await Products.updateOne({ _id: id }, { quantity: inp });
            model.n;
            model.nModified;

            res.status(200).json({ message: "update quantity",data: model});
            }
        } catch (error) {
            console.log(error);
        }
    },
    verify: async (req, res) => {
        try {
            // find and check role account
            const user = await Users.findOne({ email: req.body.email })
            if (user != null) {
                if (user.role == "admin" && req.body.sts == true) {
                    const model = await Shipping.updateOne({ _id: req.body.shippId }, { statusOrder: "valid" });
                    model.n;
                    model.nModified;
        
                    res.status(200).json({ message: "update status",data: model});
                }else if (user.role == "admin" && req.body.sts == false) {
                    const model = await Shipping.updateOne({ _id: req.body.shippId }, { statusOrder: "invalid" });
                    model.n;
                    model.nModified;
        
                    res.status(200).json({ message: "update status",data: model});
                } else{
                    res.status(500).json({ message: "Error!!!"});
                }
                
            } else {
                res.status(500).json({ message: "Cannot find user"});
            }
              
        } catch (error) {
            console.log(error);
        }
    },
};
