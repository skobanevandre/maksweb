const express = require("express");
const authRouter = express.Router();

const cookieParser = require('cookie-parser')
const db = require ( './../db' );
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const argon2 = require('argon2');

const user = require('./../models/user');

authRouter.use( cookieParser() );
authRouter.use( passport.initialize() );
authRouter.use( passport.session() );


/**
 * Local Стратегия для Passport.js
 * Берет из POST запроса на логин пользователя учетные данные, 
 * проверяет их в базе и выдает полный JSON юзера.
 */
 passport.use(
  new LocalStrategy( async (username, password, done) => {
    let validUser = await user.getByName( username );
      if ( !validUser || validUser.password.charAt( 0 ) !== '$' ) return done(null, false); 
      if ( await !argon2.verify(validUser.password, password) ) return done(null, false);       
      // console.log( 'USER PASSED' )
    return done( null,  validUser );
  })
);

/**
 * вообще не понятно зачем нужна данная функция
 */
passport.serializeUser(function( validUser, done ) {
  console.log( 'serializeUser', validUser );
  done( null, validUser.id );
});

/**
 * вообще не понятно зачем нужна данная функция
 */
passport.deserializeUser( 
  async function( id, done ) {
    console.log( 'deserializeUser, id=',  id );
    let c = await db.connect();
    console.log( 'connected' );
    let validUser = await c.query( 'select * from user where id = ?', [ id ] )
          .then ( ( [ result ] ) => { return result[0] })
    console.log( 'Query result:', validUser )
    c.end();  
    done( null, validUser );
  }
);

/**
 * Логи пользователя в систему, цепляя паспорт.
 */
authRouter.post('/login', passport.authenticate( 'local' ), async ( req, res ) => {
    // console.log( 'REQUEST: ', req.body, req.user )
    res.send( await user.generateToken( req.user ) );
  }
); 

/**
 * Возвращаем данные пользователя по полученному токену. 
 * Получаем Токен, снимаем с него имя пользователя. Идем в базу. 
 * Проверяем есть ли такой пользователь и выдаем полную инфу, Исключая пароль.
 */
authRouter.get( '/user', async ( req, res ) => {
  if ( req.cookies[ 'auth._token.local' ] !== 'false' ) {
    var tokenData = jwt.verify( req.cookies[ 'auth._token.local' ], 'oOG1rAK_VP9fhtVDd1bu' );
    let currentUser = await user.getByName( tokenData.username );
    delete currentUser.password;
    res.json( currentUser );
  } else   
    res.send( false );    
} )

/**
 * Логаут
 */
authRouter.post('/logout', function(req, res) {
    req.logout();
    res.json( { status: 'success' });
});

/**
 * Регистрация пользователя в системе.
 * В post запросе указываем:
 * username: 'value',
 * password: 'value'
 */
authRouter.post('/register', async function(req, res) {
    let r = await user.save( req.body.user );
    res.send( { 'success' : ( r.insertId > 0 ) } )
});

module.exports = authRouter;
