const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 8000;

const app = express();

// Setup static server
// app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { id: 1, title: "Open Sauce" },
    { id: 2, title: "Open Source" },
    { id: 3, title: "Open Course" }
]

app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit));
    }

    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id)) {
        let post = posts.find((post) => post.id === id);
        if (post) return res.status(200).json(post);
        return res.status(404).json({ message: "Post not found" });
    }

    res.status(400).json({ message: "invalid id" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
