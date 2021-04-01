const express = require("express");
const otherRouter = express.Router();

const other = require( './../models/other' );

otherRouter.get('/instock', async function(req, res){
  let r = await other.instock( );
  res.send( r )
});

module.exports = otherRouter;