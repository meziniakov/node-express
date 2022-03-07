import { Router } from 'express';
import { getOrganicSearch } from './parser';

const router = Router();

router.get('/:projectId/:keyword/:count', getOrganicSearch);

export default router;
