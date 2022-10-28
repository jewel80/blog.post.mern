
const Post = require("../models/posts.model");
const { default: mongoose } = require("mongoose");


//create new post => api/posts [GET]
exports.createPosts = async (req, res, next) => {
    const {
        title,
        emTest,
        articleText,
        imgUrl
    } = req.body;

    try {
        const post = await Post.create({
            title,
            emTest,
            articleText,
            imgUrl
        });

        res.status(200).json({
            success: true,
            post,
            message: "Created sucessfully!",
        });
    } catch (error) {
        // error code 11000 indicates duplicate key error...
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                message: `Provided ${duplicateKey} already exists.`,
            });
        }
        throw error;
    }
};

// Get All Posts => api/posts [POST]
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            message: "Successfully retrieved the requested data.",
            posts,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get Post By Id => api/posts/:id [GET]
exports.getPostsListById = async (req, res, next) => {
    let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidId) {
        return res.status(400).json({
            message: "Invalid ID!",
        });
    }

    let data = await Post.findById(req.params.id);
    if (!data) {
        return res.status(404).json({
            message: "Data Not Found",
        });
    }

    try {
        const post = await Post.findOne({
            _id: req.params.id,
        });

        //success response json data
        res.status(200).json({
            success: true,
            message: "Successfully retrieved the requested data.",
            post,
        });

    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: "Inernal error! Please wait a while and reload the page.",
        });
    }
};


// Get Post By Id => api/posts [PUT]
exports.updatePost = async (req, res, next) => {

    let isValidId = mongoose.Types.ObjectId.isValid(req.body.id);

    if (!isValidId) {
        return res.status(400).json({
            message: "Invalid ID!",
        });
    }

    let post = await Post.findById(req.body.id);
    if (!post) {
        return res.status(404).json({
            message: "Data Not Found",
        });
    }

    try {
        let posts = await Post.findOneAndUpdate({
            _id: req.body.id,
        }, {
            $set: req.body,
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: "Successfully Updated!",
            post: posts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Inernal error! Please wait a while and reload the page.",
        });
    }
};

//Delete Module by id  => /api/cms/v1/Module/delete/:id
exports.deleteModule = async (req, res, next) => {
    const module = await Post.findById(req.params.id);
    if (!module) {
        return next(new ErrorHandler("Module not found", 404));
    }

    await module.remove();

    res.status(200).json({
        success: true,
        message: _response.delete,
    });
};
