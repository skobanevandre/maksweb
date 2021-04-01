const db = require ( './../db' );


/**
 * @param { } none 
 * @returns { JSON }
 * Получаем список всех товаров
 * Возвращает JSON 
 */

export async function get( ) {
  let c = db.connect();

  let items = await c.query( 'select * from items ' )
    .then( ( [ result ] ) => { return result } );

  let categories = await c.query( 'select c.article, cat.* from catitems c left join categories cat on c.category = cat.id', )
    .then( ( [ result ] ) => { return result } );   
    
  c.end();    

  for ( let item of items ) {
    item.categories = categories.filter( ( { article } ) => article == item.article );
  }

  return items;
} 

/**
 * @param { int } articleId 
 * @returns { JSON }
 * Получаем товар
 * Возвращает JSON 
 */
export async function find( article ) {
  let c = await db.connect();

  console.log( 'itemFind' );

    let item = await c.query( 'select * from items where article = ?', [ article ] )
      .then( ( [ result ] ) => { return result[0] } );

      console.log( 'ITEM = ', item );

    item.categories = await c.query( 'select cat.* from catitems c left join categories cat on c.category = cat.id where c.article = ?', [ article ] )
      .then( ( [ result ] ) => { return result } );   
    
  c.end();    

  return item;
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
