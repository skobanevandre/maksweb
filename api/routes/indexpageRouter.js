const express = require("express");
const indexpageRouter = express.Router();

const indexpageModel = require('../models/indexpage');

  indexpageRouter.get('/', indexpageModel.get );

module.exports = indexpageRouter;