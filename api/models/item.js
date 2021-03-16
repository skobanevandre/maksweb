const db = require ( './../db' );

/**
 * @param { } none 
 * @returns { JSON }
 * Получаем список всех товаров
 * Возвращает JSON 
 */
export async function get( ) {
  let c = db.connect();
  let r = await c.execute( 'select * from items' ) .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}

/**
 * @param { int } articleId 
 * @returns { JSON }
 * Получаем товар
 * Возвращает JSON 
 */
export async function find( articleId ) {
  let c = db.connect();
  let r = await c.execute( 'select * from items where article = ?', [ articleId ] )
    .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}