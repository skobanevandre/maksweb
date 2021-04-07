const db = require ( './../db' );


/**
 * @param { } none 
 * @returns { JSON }
 * Получаем список всех товаров
 * Возвращает JSON 
 */

export async function get( ) {
  let c = await db.connect();

  let items = await c.query( 'select * from items order by article desc' )
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

    let item = await c.query( 'select id, article, title, description, price, indexpage, active, dimensions, images, ordered, titleimage from items where article = ?', [ article ] )
      .then( ( [ result ] ) => { return result[0] } );

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

  let c = await db.connect();
    
  let r = await c.query( 'update items set article=?, title=?, description=?, price=?, indexpage=?, active=?, dimensions=?, images=?, titleimage=?, ordered=? where article=?',
    [ 
      item.article,
      item.title,
      item.description,
      JSON.stringify( item.price ),
      item.indexpage,
      item.active,
      JSON.stringify( item.dimensions ),
      JSON.stringify( item.images ),
      item.titleimage,
      JSON.stringify( item.ordered ), 
      item.article 
    ] );

    // Убираем ID со всех категорий в теле запроса. 
    // Удаляем все сочетания категорий и товара
    // Заносим новые сочетания категорий и товара 

  r = await c.query( 'delete from catitems where article=?', [ item.article ] );

  let data = [];
  for ( let category of item.categories ) {
    let row=[];
    row.push( category.id );
    row.push( item.article );
    data.push( row );
  }

  r = await c.query( 'insert into catitems ( category, article ) values ?', [ data ] );

  c.end();  
  return r;
}


export async function insert( item ) {

  let c = await db.connect();
  
  let article = await c.query( 'select max( article )+1 as max from items' )
    .then( ( [ result ] ) => { return result[0] } );   

  article = String( article.max ).padStart( 8, 0 );

  item.indexpage = 0;
  item.active = 0;
    
  let r = await c.query( 'insert into items set article=?, title=?, description=?, price=?, indexpage=?, active=?, dimensions=?, images=?, titleimage=?, ordered=?',
    [ 
      article,
      item.title,
      item.description,
      JSON.stringify( item.price ),
      item.indexpage,
      item.active,
      JSON.stringify( item.dimensions ),
      JSON.stringify( item.images ),
      item.titleimage,
      JSON.stringify( item.ordered ), 
      item.article 
    ] );

  if ( item.categories )  {

    let data = [];

    for ( let category of item.categories ) {
      let row=[];
      row.push( category.id );
      row.push( article );
      data.push( row );
    }
    
    if ( data.length > 0) await c.query( 'insert into catitems ( category, article ) values ?', [ data ] );  
  }

  c.end();  
  return article;
}

/**
 * Удаление 
 */
export async function del( item ) {
  let c = await db.connect();
    await c.query( 'delete from items where article=?', [ item ] );
    await c.query( 'delete from catitems where article=?', [ item ] );
  c.end();  
  return 'true';
}
