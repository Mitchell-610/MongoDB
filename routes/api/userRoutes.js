const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    getUserThoughts,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');



module.exports = router;
