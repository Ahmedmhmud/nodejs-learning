const express = require("express");
const path = require('path');
const posts = require('./routes/posts');

const PORT = process.env.PORT || 8000;

const app = express();

// Setup static server
// app.use(express.static(path.join(__dirname, "public")));

app.use('/api/posts', posts);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
