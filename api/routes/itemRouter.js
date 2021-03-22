const express = require("express");
const itemRouter = express.Router();
const fileUpload = require('express-fileupload');
const imageRouter = require("./imageRouter.js");
const fs = require('fs');

const item = require( './../models/item' );
const db = require( './../db' );

itemRouter.use( "/image", imageRouter );

itemRouter.use( fileUpload( {
  useTempFiles : true,
  tempFileDir : '/tmp/'
} ) );


itemRouter.use(express.text());

/**
 * Получаем JSON всех товаров
 */
itemRouter.get('/', async function(req, res){
  let r = await item.get();
  res.send( r )
});

itemRouter.put('/', async function(req, res) {
  let r = await item.update( req.body.item );
  res.send( { 'sucess': true } )
});

/**
 * Получаем JSON конкретного товара
 */
itemRouter.get('/:articleId', async function(req, res){
  let r = await item.find( req.params.articleId );
  res.send( r )
});

module.exports = itemRouter;