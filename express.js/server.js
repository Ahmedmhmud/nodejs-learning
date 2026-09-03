import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFoundHandler from './middleware/notFound.js';

const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Setup static server
app.use(express.static(path.join(__dirname, "public")));

// EJS template engine setup

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'My website',
//         message: 'Welcome Back',
//         people: ['Ahmed', 'Mohamed', 'Omar']
//     });
// });

app.use('/api/posts', posts);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
