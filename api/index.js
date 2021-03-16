const express = require('express')
const mysql = require('mysql2');

const testRouter = require("./routes/testRouter.js");
const authRouter = require("./routes/authRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const itemRouter = require("./routes/itemRouter.js");

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);


app.get( '/', (req, res) => { res.send('main')})

module.exports = {
  path: '/api',
  handler: app
}

