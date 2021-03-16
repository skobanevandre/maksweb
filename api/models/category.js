const db = require ( './../db' );

/**
 * Получаем список всех категорий
 * @returns { JSON }
 */
export async function get() {
  let c = db.connect();
    let r = await c.execute( 'select c.*, p.name as parentname from categories c left join categories as p on c.parentcategory = p.id ' )
    // .then( ( [ result ] ) => { return JSON.parse( JSON.stringify( result )) } );
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
  let c = db.connect();
  let r = await c.query( 'update categories set name=?, parentcategory=?, description=? where id=?', 
    [ category.name, category.parentcategory, category.description, category.id ] )
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