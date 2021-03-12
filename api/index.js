const express = require('express')
var mysql = require('mysql2');
const app = express();

function createConnection() {
  return  mysql.createConnection({
    connectionLimit: 5,
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DB,
  }).promise();
}

/**
 * Получаем JSON категорий товара. 
 */
 app.get('/categories', async (req, res) => {
  console.log( 'Получаем список категорий');
  var c = createConnection();
  let i = await c.query( 'select c.*, p.name as parentname from categories c left join categories as p on c.parentcategory = p.id ' )
    .then( result => { return JSON.parse( JSON.stringify( result[0] ) ) });
  c.end();  
  res.json( i );  
});

/**
 * Получаем JSON товара. 
 * Входной параметр Артикул товара.
 */
 app.get('/item/:article', async (req, res) => {
  console.log( 'Запрошен артикул: ' + req.params.article )
  var c = createConnection();
  let i = await c.query( 'select * from items where article = ?', [ req.params.article ] )
    .then( result => { return JSON.parse( JSON.stringify( result[0] ) ) });
  c.end();  
  res.json( i );  
});

module.exports = {
  path: '/api',
  handler: app
}