import { Router } from 'express';
import {
  addDomain,
  allDomains,
  deleteDomain,
  domainById,
  allDomainsByIds,
  updateDomain,
} from './domain';

const router = Router();

router.get('/', allDomains);
router.get('/all', allDomainsByIds);
router.get('/:id', domainById);
router.delete('/:id', deleteDomain);
router.put('/:id', updateDomain);
router.post('/', addDomain);

export default router;
