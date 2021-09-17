require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5006,
    DATABASE: process.env.DATABASE
};
