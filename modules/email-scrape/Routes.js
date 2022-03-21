import { Router } from 'express';
import { getEmailScrape } from './email-scrape';

const router = Router();

router.post('/', getEmailScrape);

export default router;
