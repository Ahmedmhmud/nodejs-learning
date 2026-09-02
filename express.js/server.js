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
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let post;
    if (id) {
        post = posts.find((post) => post.id === id);
    }
    
    res.json(post);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
