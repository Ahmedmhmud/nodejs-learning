let posts = [
    { id: 1, title: "Open Sauce" },
    { id: 2, title: "Open Source" },
    { id: 3, title: "Open Course" }
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit));
    }

    res.json(posts);
};

// @desc Get post by ID
// @route GET /api/posts/:id
const getPostByID = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id)) {
        let post = posts.find((post) => post.id === id);
        if (post) return res.status(200).json(post);
            const error = {message: "Post not found", status: 404};
        return next(error);
    }

    const error = {message: "Invalid ID", status: 400};
    return next(error);
};

// @desc Create a new post
// @route POST /api/posts   
const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        const error = {message: "Title is missing", status: 400};
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(newPost);
};

// @desc Update a post
// @route PUT /api/posts/:id
const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
        const error = { message: "ID must be a positive number", status: 400 };
        return next(error);
    }

    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = { message: "Post does not exist", status: 404 };
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json(post);
};

// @desc Delete a post
// @route DELETE /api/posts/:id
const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
        const error = { message: "ID must be a positive number", status: 400 };
        return next(error);
    }

    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = { message: "Post does not exist", status: 404 };
        return next(error);
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
};

export {
    getPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost
}