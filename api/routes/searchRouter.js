const express = require("express");
const searchRouter = express.Router();

const search = require( './../models/search' );
// const db = require( './../db' );

searchRouter.get('/', async function(req, res) { 
  let r = await search.get( req.query.searchstring );
  res.send( r );
});

module.exports = searchRouter;