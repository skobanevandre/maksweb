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


/**
 * @param { JSON } item 
 * @returns { JSON } 
 * Получаем товар
 * Возвращает JSON 
 */
 export async function update( item ) {
  let c = db.connect();
  let r = await c.execute( 'update items set article=?, category=?, title=?, description=?, image=?, price=?, rating=?, indexpage=?, active=?, width=?, heigth=?, deep=? where article = ?', 
    [ item.article, item.category, item.title, item.description, item.image, item.price, item.rating, item.indexpage, item.active, item.width,  item.heigth, item.deep, item.article ] )
    .then( ( [ result ] ) => { console.log( 'result=', result ); return result; } );
  c.end();  
  return r;
}
