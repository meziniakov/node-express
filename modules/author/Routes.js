import { Router } from 'express';
import { addAuthor, allAuthors, authorById } from './author';
const router = Router();

router.get('/all', allAuthors);
router.get('/:id', authorById);
router.post('/', addAuthor);

export default router;
