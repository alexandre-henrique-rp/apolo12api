const express = require('express');
const router = express.Router();
;

//import controllers
const UserController = require('./controllers/UserController')

router.get('/totem/:id', UserController.totem);

module.exports = router;




