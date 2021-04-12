const db = require ( './../db' );

 export async function instock( ) {
  // console.log( 'setInstock' );
 let c = await db.connect();
 let r = await c.query( 'select * from instock' )
   .then( ( [ result ] ) => { console.log( 'result=', result ); return result; } );
   // console.log( 'endInstock' );
 c.end();  
 return r;
}