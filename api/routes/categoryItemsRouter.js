const express = require("express");
const categoryItemsRouter = express.Router();
const categoryItems = require( './../models/categoryItems' );
const category = require( './../models/category' );

categoryItemsRouter.get('/:category', async function( req, res ){
  let items = await categoryItems.get( req.params.category );
  let cat = await category.getOne( req.params.category );
  res.json( { 'items': items, 'category': cat } );
});

module.exports = categoryItemsRouter;