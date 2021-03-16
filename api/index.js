const express = require('express')
const cookieParser = require('cookie-parser')
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const argon2 = require('argon2');

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( cookieParser() );

function createConnection() {
  return  mysql.createConnection({
    connectionLimit: 5,
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DB,
  }).promise();
}

// END INIT

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
 * Сохранение новой категории.
 */
 app.post('/categories', async (req, res) => {
  console.log( 'Сохранение новой категории.' );

  var c = createConnection();
  let i = await c.query( 'insert into categories ( name, parentcategory, description ) values ( ?,?,? )', [ req.body.name, req.body.parentcategory, req.body.description ] )
    .then( result => { return { success: true } } );
  c.end();  

  res.json ( i );
});

/**
 * Редактирование категории.
 */
 app.put('/categories', async (req, res) => {
  console.log( 'Редактирование ктегории # ' + req.body.id );
  console.log ( req.body );
  var c = createConnection();
  let i = await c.query( 'update categories set name=?, parentcategory=?, description=? where id=?', [ req.body.name, req.body.parentcategory, req.body.description, req.body.id ] )
    .then( result => { return { success: true } } );
  c.end();  

  res.json ( i );
});

/**
 * Удаление категории.
 */
 app.delete('/categories/:id', async (req, res) => {
  console.log( 'Удаление категории # ' + req.params.id );
  var c = createConnection();
  let i = await c.query( 'delete from categories where id=?', [ req.params.id ] )
    .then( result => { return { success: true } } );
  c.end();  

  res.json ( i );
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

// --- USER --- //

passport.use(
  new LocalStrategy( async (username, password, done) => {
    let validUser = await getUserByName( username );

    if (!validUser) { 
      return done(null, false); 
    }
    
    const correctPassword = await argon2.verify(validUser.password, password);
    if (!correctPassword) { 
      return done(null, false); 
    }      

    return done( null,  validUser );
  })
);

passport.serializeUser(function( validUser, done ) {
  done( null, validUser.id );
});

passport.deserializeUser( 
  async function( id, done ) {
    console.log( 'deserializeUser, id',  id );
    let c = createConnection();
    let validUser = await c.query( 'select * from user where id = ?', [ id ] )
          .then ( request => { return JSON.parse( JSON.stringify( result[0][0] ) ) })
    c.end();  
    done( null, validUser );
  }
);

/**
 * Token generating Using JWT
 * @param { JSON } user 
 * @returns Token
 */
 function generateToken( validUser ) {
  const signature = 'oOG1rAK_VP9fhtVDd1bu';
  let expireTime = 120;
  let sign = jwt.sign( { username: validUser.username }, signature, { expiresIn: expireTime } );
  return sign;
}

async function saveUser ( user ) {
  const hashedPassword = await argon2.hash( user.password );
  let c = createConnection();
    let r = await c.query( 'insert into user set name = ?, username = ?, password = ?, email = ?' , [ user.name, user.username, hashedPassword, user.email ] )
  c.end();
  return r;
}

async function getUserByName( username ) {
  let c = createConnection();
  let validUser = await c.query( 'select * from user where username = ?', [ username ] )
        .then ( result => { return JSON.parse( JSON.stringify( result[0][0] ) ) })
  c.end(); 
  return validUser;
}

app.post('/auth/login', 
  passport.authenticate( 'local' ),
  async ( req, res ) => {
    res.send( await generateToken( req.user ) );
  }
); 

app.get( '/auth/user', async ( req, res ) => {
    var tokenData = jwt.verify( req.cookies[ 'auth._token.local' ], 'oOG1rAK_VP9fhtVDd1bu' );
    let currentUser = await getUserByName( tokenData.username );
    delete currentUser.password;
    res.json( currentUser );
} )

app.post('/auth/logout',
  function(req, res){
    req.logout();
    res.json( { status: 'success' });
  });

app.post('/auth/newuser',
  async function(req, res){
    let r = await saveUser( req.body.user );
    res.send( { 'success' : ( r.insertId > 0 ) } )
});

// ----------------------

app.get('/test',
  async function(req, res){
    
    let c = createConnection();
    let validUser = await c.query( 'select * from categories' )
          .then ( result => { return result[0] } )
    c.end(); 

    // res.send( { 'success' : Boolean( validUser ) } )
    res.send( validUser )
});

module.exports = {
  path: '/api',
  handler: app
}

