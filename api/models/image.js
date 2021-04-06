const db = require ( './../db' );

/**
 * @param { } none 
 * @returns { JSON }
 * Получаем список всех товаров
 * Возвращает JSON 
 */
export async function insert( image ) {
  let c = await db.connect();
  let r = await c.query( 'insert into images set article = ?, url = ?, alt = ?, main = ?', 
    [ image.article, image.url, image.alt, image.main] )
    .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}

export async function updateAlt( image ) {
  let c = await db.connect();
  let r = await c.query( 'update images set alt = ?', [ image.alt ] )
    .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}

export async function updateMain( image ) {
  let c = await db.connect();
  let r = await c.query( 'update images set main = ?', [ image.main ] )
    .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}