import { MongoClient } from 'mongodb';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.urlencoded({ extended: true }));

const userSchema = mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('user', userSchema);

await mongoose.connect(
    'mongodb://localhost:27017/express-learning'
);

// EJS setup
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', async (req, res, next) => {
    const users = await User.find();

    res.render('index', {
        users: users
    });
});

app.post('/login', async (req, res, next) => {
    const name = req.body.name;
    const age = +req.body.age;

    User.create({
        name: name,
        age: age
    });

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});