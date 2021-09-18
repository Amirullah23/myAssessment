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
            // find and check role account
            const user = await Users.findOne({ email: req.body.email })
            if (user != null) {
                if (user.role == "admin") {
                    const model = new Products(req.body);
                    model.save(function (err) {
                        if (err) return handleError(err);
                    });
                    console.log()
                    res.status(200).json({ message: "Add new Products", data: model });
                } else {
                    res.status(200).json({ message: "Cannot add product" });
                }
            }
            else {
                res.status(200).json({ message: "Register first!!!" });
            }

        } catch (error) {
            console.log(error);
        }
    }
};
