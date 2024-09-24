const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createThoughtAndLinkUser,
    getUserThoughts,
    addCommentToThought,

} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api/thoughts/link
router.post('/link', createThoughtAndLinkUser); 

// /api/users/:userId/thoughts
router.get('/users/:userId/thoughts', getUserThoughts);

// /api/thoughts/:thoughtId/comments
router.post('/:thoughtId/comments', addCommentToThought); 

module.exports = router;
