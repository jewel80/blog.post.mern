const express = require('express');
const router = express.Router();

//Import funtionalities from content Controller
const {
    createPosts,
    getPosts,
    getPostsListById,
    updatePost,
    deletePost,
    createComments,
    getCommentsByPostId
} = require("../controllers/postsController");



//Below Post Route URL... 
router.route("/posts").post(createPosts);
router.route("/posts").get(getPosts);
router.route("/posts/:id").get(getPostsListById);
router.route("/posts").put(updatePost);
router.route("/posts/:id").delete(deletePost);

//Comments...
router.route("/comments").post(createComments);
router.route("/comments").get(getCommentsByPostId);


module.exports = router;


