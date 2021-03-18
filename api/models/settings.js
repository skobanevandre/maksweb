const db = require ( './../db' );

/**
 * @param { } none 
 * @returns { JSON }
 * Получаем список всех настроек
 * Возвращает JSON 
 */
export async function get( ) {
  let c = db.connect();
    let r = await c.execute( 'select * from settings' ) .then( ( [ result ] ) => { return result[0] } );
  c.end();  
  return r;
}

/**
 * @param { JSON } data
 * @returns { JSON }
 * Редактируем список настроек процентов стоимости товара
 * Возвращает JSON 
 */
 export async function updatePricingPercentage( data ) {
   console.log( 'data: ', data );
  let c = db.connect();
    let r = await c.execute( 'update settings set standartpricepercent = ?, salepricepercent = ?, licvidationpricepercent = ?' ,
      [ data.standartpricepercent, data.salepricepercent, data.licvidationpricepercent ] )
      .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}
