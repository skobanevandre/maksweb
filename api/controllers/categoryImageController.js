const im = require('imagemagick');
const fs = require('fs');
const image = require( '../models/image' )

const tempDir = 'static/images/category/tmp/';
const destDir = 'static/images/category/';

/**
 *  План такой:
 *  Получаем от фронтенда файл. Сохраняем его с именем Текущего времени + расширение от полученного файла.
 *  Возвращаем сохраненное имя файла + путь.
 */

exports.saveImage = ( req, res ) => {

  if ( !req.files || Object.keys(req.files).length == 0 ) 
    return res.status(400).json( { status: false } );

  // Записываем картинку вв Temp Директорию для дальнейшей конвертации

  let imageName = Date.now( );
  let upload = tempDir + imageName + '.' + req.files.image.name.split('.').pop();

  req.files.image.mv( upload, function (err) {
    if ( err ) return res.status(400).json( { status: 'move' } );

    // Конвертируем изображение

    im.convert([ upload, '-resize', '800x', tempDir + imageName + '.jpg' ], 
      function(err, stdout){
        if (err) return res.status(400).json( { status: 'convert' } )

        // Если нет нужной директории, то создаем ее  
        if ( !fs.existsSync( destDir + req.params.article + '/' ) ) fs.mkdirSync( destDir + req.params.article + '/' );

        // Переносим изображение в нужную директорию      
        fs.rename(
          tempDir + imageName + '.jpg',
          destDir + imageName + '.jpg', 

          function (err){
            // Удаляем TMP картинку
            if ( fs.existsSync( upload ) ) fs.unlinkSync( upload );
            if ( err ) return res.status(400).json( { status: 'rename', dest:  destDir + imageName + '.jpg' } );
            return res.send( '/images/category/' + imageName + '.jpg' );
          }
        ); // fs.rename
      }
    ); // im.convert
  }); // image.mv
}; // exports.saveImage

/**
 * Удаляем картинку. Урл находится в теле запроса. 
 */
exports.delImage = ( req, res ) => {
  if ( req.body.image ) 
    fs.unlink( destDir + req.body.image, 
    ( err ) => {
     return res.status(400).json( { status: 'false' } )
    });
  else   
  return res.json( { status: 'true' } )
};
