const express = require("express");
const categoryRouter = express.Router();

const category = require( './../models/category' );

/**
 * Получение списка категорий
 * Метод - GET
 */
categoryRouter.get('/', async (req, res) => {
  let r = await category.get();
  res.json( r );  
});

/**
 * Редактирование категории.
 * Метод - PUT
 */
 categoryRouter.put('/', async (req, res) => {
  let r = await category.edit( req.body );
  res.json ( r );
});

/**
 * Сохранение новой категории.
 * Метод - POST
 */
 categoryRouter.post('/', async (req, res) => {
  let r = await category.insert( req.body );
  res.json ( r );
});

/**
  * Удаление категории.
  * Метод DELETE
  */
categoryRouter.delete('/:id', async (req, res) => {
  let r = await category.remove( req.params.id );
  res.json ( r );
});

module.exports = categoryRouter;