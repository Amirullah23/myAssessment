const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const { PORT, db } = require("./config");


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));
app.use("/product", require("./routes/products"));
app.use("/cart", require("./routes/cart"));



if(db){
    app.listen(PORT, () => {
        console.log(`Application is running on ${PORT}`);
    })
}
