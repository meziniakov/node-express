import { Router } from 'express';
import {
  allProjects,
  getDomainsByProjectId,
  addProject,
  deleteProjectById,
} from './project';

const router = Router();

router.get('/', allProjects);
router.get('/:id', getDomainsByProjectId);
router.post('/', addProject);
router.delete('/:id', deleteProjectById);

export default router;
