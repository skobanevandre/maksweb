const express = require("express");
const itemRouter = express.Router();

const item = require( './../models/item' );
const db = require( './../db' );

/**
 * Получаем JSON всех товаров
 */
itemRouter.get('/', async function(req, res){
  let r = await item.get();
  res.send( r )
});


/**
 * Редактирование товара
 */
itemRouter.put('/', async function(req, res) {
  // console.log( 'ITEM REQ: ', req );
  let r = await item.update( req.body );
  res.send( { 'sucess': true } )
});

/**
 * Добавление товара
 */
 itemRouter.post('/', async function(req, res) {
  // console.log( 'ITEM REQ: ', req );
  let r = await item.insert( req.body );
  res.send( { 'article': r } )
});

/**
 * Получаем JSON конкретного товара
 */
itemRouter.get('/:articleId', async function(req, res){
  let r = await item.find( req.params.articleId );
  res.send( r )
});

itemRouter.delete('/:articleId', async function(req, res){
  let r = await item.del( req.params.articleId );
  res.send( r )
});

module.exports = itemRouter;