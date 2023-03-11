const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { getText, loginUser, registerUser, deleteAllUsers, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/tokenValidation');
const router = Router();

router
    .post('/register', registerUser)
    .post('/login', loginUser)
    //! for getting info about the current user
    .get('/current', validateToken, currentUser)
    .delete('/delete', deleteAllUsers)
    .get('/get', getText)

module.exports = router;
