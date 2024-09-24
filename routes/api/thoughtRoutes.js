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



module.exports = router;
