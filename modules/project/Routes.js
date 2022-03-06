import { Router } from 'express';
import {
  allProjects,
  projectById,
  addProject,
  deleteProjectById,
} from './project';

const router = Router();

router.get('/', allProjects);
router.get('/:id', projectById);
router.post('/', addProject);
router.delete('/:id', deleteProjectById);

export default router;
