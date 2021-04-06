const db = require ( './../db' );

/**
 * Получаем список всех категорий
 * @returns { JSON }
 */
export async function get() {
  let c = await db.connect();
    let r = await c.query( 'select * from categories' )
    .then( ( [ result ] ) => { return result } );
  c.end();
  return r;
}

/**
 * Получаем объект конкретной категории.
 * @param { INTEGER } id 
 * @returns { JSON }CATEGORY OBJECT
 */
export async function getOne( id ) {
  let c = await db.connect();
    let r = await c.query( 'select * from categories where id=?', [ id ] )
    .then( ( [ result ] ) => { return result } );
  c.end();
  return r;
}

         
/**
 * @param { JSON } category 
 * @returns { boolean }
 * Редактирование категории товара
 * Возвращает true || false
 */
export async function edit( category ) {
  let c = await db.connect();
  let r = await c.query( 'update categories set name=?, parentcategory=?, description=?, image=?, active=?, indexpage=?, imagealt=? where id=?', 
    [ 
      JSON.stringify( category.name ), 
      category.parentcategory, 
      JSON.stringify( category.description ), 
      JSON.stringify( category.image ), 
      category.active, 
      category.indexpage, 
      JSON.stringify( category.imagealt ), 
      category.id 
    ] )
    .then( result => { return { success: true } } );
  c.end();  
  return r;
}
 
/**
 * @param { JSON } category 
 * @returns { boolean }
 * Создание новой категории товара
 * Возвращает true || false
 */
export async function insert( category ) {
  let c = db.connect();
  let r = await c.query( 'insert into categories ( name, parentcategory, description ) values ( ?,?,? )', 
    [ category.name, category.parentcategory, category.description ] )
    .then( result => { return { success: true } } );
  c.end();  
  return r;
}  

/**
 * @param { int } categoryID
 * @returns { boolean }
 * Удаление категории товара
 * Возвращает true || false
 */
export async function remove( categoryId ) {
  let c = db.connect();
  let r = await c.query( 'delete from categories where id=?', [ categoryId ] )
    .then( result => { return { success: true } } );
  c.end();  
  return r;
}