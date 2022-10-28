
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

// cms Module => /api/cms/v1/Module/add
exports.getposts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            message: "Successfully retrieved the requested data.",
            posts,
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//find by id from module collection => /api/cms/v1/module/list/:id
exports.getModuleListById = async (req, res, next) => {
    let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

    // //Param valid check
    if (!isValidId) {
        return res.status(400).json({
            message: _response.isNotValidId,
        });
    }

    // //collection data find
    let data = await Post.findById(req.params.id);

    // // condition check
    if (!data) {
        return res.status(404).json({
            message: _response.notFound,
        });
    }

    try {
        //find by id from module collection
        const module = await Post.findOne({
            _id: req.params.id,
        });

        //success response json data
        res.status(200).json({
            success: true,
            module,
        });
    } catch (err) {
        //Error message response
        return res.status(500).json({
            message: _response.internalError,
        });
    }
};



//Updated Module collection by id => /api/cms/v1/Module/update/:id
exports.updateModule = async (req, res, next) => {
    let module = await Post.findById(req.params.id);

    if (!module) {
        return next(new ErrorHandler("Module not found", 404));
    }

    try {
        module = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            module,
            message: _response.update,
        });
    } catch (err) {
        return res.status(500).json({
            message: _response.internalError,
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
