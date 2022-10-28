const express = require('express');
const router = express.Router();

//Import funtionalities from content Controller
const {
    createPosts,
    getposts,
    //   updateModule,
    //   getModuleListById,
    //   deleteModule
} = require("../controllers/postsController");



//Below Post Route URL... 
router.route("/posts").post(createPosts);
router.route("/posts").get(getposts);
// router.route("/module/list/:id").get(getModuleListById);                                                 
// router.route("/module/update/:id").put(updateModule);                                                    
// router.route("/module/delete/:id").delete(deleteModule);                                                




module.exports = router;


