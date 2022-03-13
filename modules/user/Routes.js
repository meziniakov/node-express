import { Router } from 'express';
import { userGetAll, userRegister, userLogin, deleteUserById } from './user';
import { check } from 'express-validator';
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Email is not corrected').isEmail(),
    check('password', 'Password is not corrected. Min 6 symbols').isLength({
      min: 6,
    }),
  ],
  userRegister
);
router.post(
  '/login',
  [
    check('email', 'Email is not corrected').isEmail(),
    check('password', 'Password is not corrected. Min 6 symbols').isLength({
      min: 6,
    }),
  ],
  userLogin
);
router.get('/', userGetAll);
router.delete('/:id', deleteUserById);

export default router;
