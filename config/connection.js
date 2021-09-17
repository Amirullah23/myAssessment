const mongoose = require("mongoose");
const {DATABASE} = require("./environment");

mongoose
    .connect(`${DATABASE}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(error => {
        console.log("There is something wrong", error);
    });

const db = mongoose.connection;

module.exports = db;

