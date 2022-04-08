import { Router } from 'express';
import {
  allProjects,
  getDomainsByProjectId,
  addProject,
  deleteProjectById,
  updateProject,
  getProject,
} from './project';

const router = Router();

router.get('/', allProjects);
router.get('/:id/info', getProject);
router.get('/:id', getDomainsByProjectId);
router.post('/', addProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProjectById);

export default router;
