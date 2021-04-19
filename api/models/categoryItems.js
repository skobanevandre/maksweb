const db = require ( './../db' );

export async function get( cat ) {
  let c = await db.connect();
    let items = await c.query('select i.* from catitems c left join items i on c.article = i.article where c.category = ?', [ cat ] )
      .then( ( [ result ] ) => { return result } );   
  c.end();
  return items;
}