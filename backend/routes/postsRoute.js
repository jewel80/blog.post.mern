const express = require('express');
const router = express.Router();

//Import funtionalities from content Controller
const {
    createPosts,
    getPosts,
    getPostsListById,
    updatePost,
    deletePost,
    //   getModuleListById,
    //   deleteModule
} = require("../controllers/postsController");



//Below Post Route URL... 
router.route("/posts").post(createPosts);
router.route("/posts").get(getPosts);
router.route("/posts/:id").get(getPostsListById);
router.route("/posts").put(updatePost);
router.route("/posts/:id").delete(deletePost);                                                
// router.route("/module/list/:id").get(getModuleListById);                                                 
// router.route("/module/update/:id").put(updateModule);                                                    




module.exports = router;


