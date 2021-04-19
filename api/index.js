const express = require('express')
const mysql = require('mysql2');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const session = require('express-session')

const testRouter = require("./routes/testRouter.js");
const authRouter = require("./routes/authRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const itemRouter = require("./routes/itemRouter.js");
const imageRouter = require("./routes/imageRouter.js");
const settingsRouter = require("./routes/settingsRouter.js");
const otherRouter = require("./routes/otherRouter.js");
const categoryImageRouter = require("./routes/categoryImageRouter.js");
const indexpageRouter = require("./routes/indexpageRouter");
const searchRouter = require("./routes/searchRouter");
const categoryItemsRouter = require("./routes/categoryItemsRouter");

const app = express();

app.use( session({ secret: 'keyboard cat', resave: true, saveUninitialized: true,  path: '/azs/', httpOnly: true, secure: false, maxAge: null }) );

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

var accessLogStream = fs.createWriteStream ( path.join('', 'access.log'), { flags: 'a' } );
app.use( morgan( 'dev', { stream: accessLogStream } ) );

app.use( "/test", testRouter );
app.use( "/auth", authRouter );
app.use( "/item", itemRouter );
app.use( "/category", categoryRouter );
app.use( "/settings", settingsRouter );
app.use( "/other", otherRouter );
app.use( "/image", imageRouter );
app.use( "/catimage", categoryImageRouter );
app.use( "/indexpage", indexpageRouter );
app.use( "/search", searchRouter );
app.use( "/categoryitems", categoryItemsRouter );

app.get( '/', (req, res) => { res.send('main') } );

app.get( '/testconnection', async (req, res) => { 
  try {
    await dbs.authenticate();
    dbs.close();
    res.send('Connection has been established successfully.');
  } catch (error) {
    //  console.log( 'error=', error )
    res.send( 'ERROR' );
  }
} );

module.exports = {
  path: '/api',
  handler: app
}

