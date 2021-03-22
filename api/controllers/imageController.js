const im = require('imagemagick');

const fs = require('fs');

const tempDir = 'static/images/item/tmp/';
const destDir = 'static/images/item/';


/**
 *  
 * 
 *  План такой:
 *  Получаем от фронтенда файл. Сохраняем его с именем Текущего времени + расширение от полученного файла.
 *  Возвращаем сохраненное имя файла + путь.
 */

exports.saveImage = async ( req, res ) => {

  if ( !req.files || Object.keys(req.files).length == 0 ) 
    return res.status(400).json( { status: false } );

  // Записываем картинку вв Temp Директорию для дальнейшей конвертации

  let imageName = Date.now( );
  let upload = tempDir + imageName + '.' + req.files.image.name.split('.').pop();

  req.files.image.mv( upload, function (err) {
    if ( err ) return res.status(400).json( { status: 'move' } );

    // Конвертируем изображение

    im.convert([
      upload,
      tempDir + imageName + '.jpg'
    ], function(err, stdout){
      if (err) return res.status(400).json( { status: 'convert' } )

      // Если нет нужной директории, то создаем ее  
      if ( !fs.existsSync( destDir + req.params.article + '/' ) ) fs.mkdirSync( destDir + req.params.article + '/' );

      // Переносим изображение в нужную директорию      
      fs.rename(
        tempDir + imageName + '.jpg',
        destDir + req.params.article + '/' + imageName + '.jpg', 
        function (err){
          if ( err ) return res.status(400).json( { status: 'rename', dest:  destDir + req.params.article + '/' + imageName + '.jpg' } );

          return res.json( { image: destDir + req.params.article + '/' + imageName + '.jpg', } )
          
      }); // fs.rename
    }); // im.convert
  }); // image.mv

}


