const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.post('/', userController.createUser);
router.get('/filter', userController.filterUsers);

module.exports = router;