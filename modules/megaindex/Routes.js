import { Router } from 'express';
import { getData } from './megaindex';

const router = Router();

router.post('/', getData);

export default router;
