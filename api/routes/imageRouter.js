const express = require("express");
const itemRouter = express.Router();

const fileUpload = require('express-fileupload');

const imageController = require('../controllers/imageController');

itemRouter.use( fileUpload() ); // Позволяет получать файлы бекенду.
itemRouter.use( express.text() ); 

const item = require( './../models/item' );
const db = require( './../db' );

  /**
   * Сохраняем картинку.
   * Возврат - получение массива местоположения картинок
   */

itemRouter.post( '/:article', imageController.saveImage );


/**
 * Получаем картинки
 */
itemRouter.get('/:article', imageController.getImages );

/**
 * Удаление картинки
 */
 itemRouter.delete('/:article', imageController.delImage );


module.exports = itemRouter;