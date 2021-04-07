const express = require("express");
const imageRouter = express.Router();

const fileUpload = require('express-fileupload');

const imageController = require('../controllers/imageController');

imageRouter.use( fileUpload() ); // Позволяет получать файлы бекенду.
imageRouter.use( express.text() ); 

// const item = require( './../models/item' );
// const db = require( './../db' );

  /**
   * Сохраняем картинку.
   * Возврат - получение массива местоположения картинок
   */

imageRouter.post( '/:article', imageController.saveImage );


/**
 * Получаем картинки
 
imageRouter.get('/:article', imageController.getImages );
*/

/**
 * Удаление картинки

imageRouter.delete('/:article', imageController.delImage );
 */


module.exports = imageRouter;