import express from 'express';
const router = express.Router();

let posts = [
    { id: 1, title: "Open Sauce" },
    { id: 2, title: "Open Source" },
    { id: 3, title: "Open Course" }
]

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit));
    }

    res.json(posts);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id)) {
        let post = posts.find((post) => post.id === id);
        if (post) return res.status(200).json(post);
                const error = {message: "Post not found", status: 404};
        return next(error);
    }

    const error = {message: "Invalid ID", status: 400};
    return next(error);
});

router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        return res.status(400).json({ message: "Title is missing" });
    }

    posts.push(newPost);
    res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
        return res.status(400).json({ message: "ID must be a positive number" });
    }

    const post = posts.find((post) => post.id === id);
    if (!post) {
        return res.status(404).json({ message: "Post does not exist" });
    }

    post.title = req.body.title;
    res.status(200).json(post);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
        return res.status(400).json({ message: "ID must be a positive number" });
    }

    const post = posts.find((post) => post.id === id);
    if (!post) {
        return res.status(404).json({ message: "Post does not exist" });
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
});

export default router;