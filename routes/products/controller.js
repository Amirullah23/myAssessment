const { Products, Users } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
        try {

            const result = await Products.find({});

            res.status(200).json({ message: "Show data Products", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    addOne: async (req, res) => {
        try {
            const user = await Users.findOne({email:req.body.email})
            const model = new Products({
                ...req.body,...{user: user._id}
            })
            // const result = await Users.findOne({email: req.body.email})
            model.save(function (err) {
                if (err) return handleError(err);
                // that's it!
              });
            console.log()

            res.status(200).json({ message: "Add new Products", data: model });
        } catch (error) {
            console.log(error);
        }
    }
};
