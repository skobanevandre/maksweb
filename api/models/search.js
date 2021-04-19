const db = require ( './../db' );

export async function get( searchString, orderBy ) {
  let c = await db.connect();
    let r = await c.query( 'select * from items where upper( title ) like upper( "%' + searchString + '%" )' ) 
      .then( ( [ result ] ) => { return result } );
  c.end(); 
  return r;
}
