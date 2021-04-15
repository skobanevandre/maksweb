const db = require ( './../db' );

export async function get( searchString ) {
  let c = await db.connect();
   let sql = 'select * from items where upper( title ) like upper( "%' + searchString + '%" )';
    let r = await c.query( sql ) 
      .then( ( [ result ] ) => { return result } );
  c.end(); 
  return r;
}
