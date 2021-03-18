const express = require('express')
const mysql = require('mysql2');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const testRouter = require("./routes/testRouter.js");
const authRouter = require("./routes/authRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const itemRouter = require("./routes/itemRouter.js");
const settingsRouter = require("./routes/settingsRouter.js");

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
var accessLogStream = fs.createWriteStream ( path.join('', 'access.log'), { flags: 'a' } );
app.use( morgan( 'dev', { stream: accessLogStream } ) );

app.use( "/test", testRouter );
app.use( "/auth", authRouter );
app.use( "/item", itemRouter );
app.use( "/category", categoryRouter );
app.use( "/settings", settingsRouter );

app.get( '/', (req, res) => { res.send('main') } );

module.exports = {
  path: '/api',
  handler: app
}

