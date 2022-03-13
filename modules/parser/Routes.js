import { Router } from 'express';
import { getOrganicSearch } from './parser';

const router = Router();

router.post('/', getOrganicSearch);

export default router;
