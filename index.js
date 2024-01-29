const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./routes/route');
require('dotenv').config();
const cors = require('cors');

/* Running on Port:4000 */

app.listen(process.env.PORT, (err) => {
    if (err)
        console.log(err)
    else
        console.log("Started");
    console.log("Local: http://localhost:" + process.env.PORT);
});

/* MongoDB connection */

mongoose.connect(process.env.DATABASE_URL).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
});

app.options('*', cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use("/api", routes);