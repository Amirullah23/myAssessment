const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const { PORT, db } = require("./config");


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({
        message: 'success'
    });
});

if(db){
    app.listen(PORT, () => {
        console.log(`Application is running on ${PORT}`);
    })
}
