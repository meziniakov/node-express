import { Router } from 'express';
import { getOrganicSearch, getEmailsByGoogleSearch } from './parser';

const router = Router();

router.post('/', getOrganicSearch);
router.post('/emails', getEmailsByGoogleSearch);
// router.get('/emails/:domain', getEmailsByGoogleSearch);

export default router;
