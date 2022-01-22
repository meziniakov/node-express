import { Router } from 'express';
import { userGetAll, userRegister } from './user';
const router = Router();

router.post('/', userRegister);
router.get('/', userGetAll);

export default router;
