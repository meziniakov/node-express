import { Router } from 'express';
import { getXlsx } from './excel';
const router = Router();

// router.post(
//   '/register',
//   [
//     check('email', 'Email is not corrected').isEmail(),
//     check('password', 'Password is not corrected. Min 6 symbols').isLength({
//       min: 6,
//     }),
//   ],
//   userRegister
// );
router.get('/', getXlsx);
// router.delete('/:id', deleteUserById);

export default router;
