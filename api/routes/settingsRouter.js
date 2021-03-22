const express = require("express");
const settingsRouter = express.Router();

const settings = require( './../models/settings' );
const db = require( './../db' );

/**
 * Получаем JSON всех товаров
 */
 settingsRouter.get('/', async function(req, res) { 
  let r = await settings.get();
  res.send( r );
});

/**
 * Получаем JSON всех товаров
 */
 settingsRouter.put('/', async function(req, res) {
  let r = await settings.updatePricingPercentage( req.body.settings );
  res.send( r )
} );


module.exports = settingsRouter;