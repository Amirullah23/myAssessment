const { PORT, DATABASE} = require("./environment");
const db = require("./connection");

module.exports = {
    PORT: PORT,
    DATABASE,
    db: db
};
