const db = require ( './../db' );
const jwt = require('jsonwebtoken');

/**
 * @param { string } username 
 * @returns { JSON }
 * Поиск пользователя в базе по логину
 * Возвращает JSON пользователя вместе с паролем
 */
export async function getByName ( username ) {
		let c = db.connect();
		let validUser = await c.execute( 'select * from user where username = ?', [ username ] )
					.then ( ( [ result ] ) => { return result[0] } )
		c.end(); 
		return validUser;
}
/**
 * Сохраняем пользователя в базе
 * @param {JSON} user 
 * @returns reslt of execute query
 */
export async function save ( user ) {
  const hashedPassword = await argon2.hash( user.password );
  let c = db.connect();
    let r = await c.execute( 'insert into user set name = ?, username = ?, password = ?, email = ?' , 
			[ user.name, user.username, hashedPassword, user.email ] )
  c.end();
  return r;
}

/**
 * Token generating Using JWT
 * @param { JSON } user 
 * @returns Token
 */
 export function generateToken( validUser ) {
  const signature = 'oOG1rAK_VP9fhtVDd1bu';
  let expireTime = 3600;
  let sign = jwt.sign( { username: validUser.username }, signature, { expiresIn: expireTime } );
  return sign;
}