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
  let c = db.connect();
    let r = await c.execute( 'update settings set wholesalepricepercent = ?, salepricepercent = ?, licvidationpricepercent = ?' ,
      [ data.wholesalepricepercent, data.salepricepercent, data.licvidationpricepercent ] )
      .then( ( [ result ] ) => { return result } );
  c.end();  
  return r;
}
