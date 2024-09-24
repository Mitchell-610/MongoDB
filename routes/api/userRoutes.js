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

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);
  
  // /api/users/:userId/thoughts
router.get('/:userId/thoughts', getUserThoughts);



module.exports = router;
