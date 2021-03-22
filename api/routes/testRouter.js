const express = require("express");
const testRouter = express.Router();

const db = require( './../db' );

testRouter.get('/',
  async function(req, res){
    
    let c = db.connect();
    let validUser =
     await c.query( 'select * from categories' )
          .then ( result => { return result[0] } )
    c.end(); 

    // res.send( { 'success' : Boolean( validUser ) } )
    res.send( validUser )
});

module.exports = testRouter;