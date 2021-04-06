const db = require ( './../db' );

export async function get( req, res ) {
  // Выбираем все категории с active = 1 и indexpage = 1
  let c = await db.connect();
  
  let categories = await c.query( 'select * from categories where active = 1 and indexpage = 1 and id in ( select category from catitems where article in ( select article from items where active = 1 and indexpage = 1 ORDER by article ) order by category )' )
    .then( ( [ result ] ) => { return result } );

  let catitems = await c.query( 'select * from catitems' )
    .then( ( [ result ] ) => { return result } );

  let items = await c.query( 'select * from items where active = 1 and indexpage = 1' )
    .then( ( [ result ] ) => { return result } );

  c.end();

  for ( let category of categories ) {
    category.items = [];
    for ( let catitem of catitems ) {
      if ( category.id == catitem.category ) {
        for( let item of items ) {
          if ( item.article == catitem.article ) {
            category.items.push( item );
          }
        }
    }  
    }  
  }

  res.json( categories );
};
