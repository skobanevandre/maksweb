const express = require("express");
const itemRouter = express.Router();

const category = require( './../models/item' );
const db = require( './../db' );

/**
 * Получаем JSON всех товаров
 */
itemRouter.get('/', async function(req, res){
  let r = await item.get();
  res.send( r )
});

/**
 * Получаем JSON конкретного товара
 */
itemRouter.get('/:articleId', async function(req, res){
  let r = await item.find( req.params.articleId );
  res.send( r )
});

module.exports = itemRouter;