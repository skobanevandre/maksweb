const express = require("express");
const categoryImageRouter = express.Router();

const fileUpload = require('express-fileupload');

const categoryImageController = require('../controllers/categoryImageController');

categoryImageRouter.use( fileUpload() ); // Позволяет получать файлы бекенду.
categoryImageRouter.use( express.text() ); 

/**
 * Сохраняем картинку.
 * Возврат - получение массива местоположения картинок
 */
categoryImageRouter.post( '/', categoryImageController.saveImage );

/**
 * Удаление картинки
 */
 categoryImageRouter.delete('/', categoryImageController.delImage );


module.exports = categoryImageRouter;