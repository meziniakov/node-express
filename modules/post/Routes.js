import { Router } from 'express';
import { addPost, allPosts, postById } from './post';

const router = Router();

router.get('/posts', allPosts);
router.get('/:id', postById);
router.post('/', addPost);

export default router;
