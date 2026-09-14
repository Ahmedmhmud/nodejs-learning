import express from 'express';
const router = express.Router();
import { getPosts, getPostByID, createPost, updatePost, deletePost } from '../controllers/postController.js';


router.get('/', getPosts);

router.get('/:id', getPostByID);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;