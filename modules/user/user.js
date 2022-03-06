import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { validationResult } from 'express-validator';

export async function userRegister(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({
          errors: errors.array(),
          status: 'error',
          message: 'Некорректные данные',
        });
    }

    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(200)
        .json({ status: 'error', message: 'User is existing' });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await new User({
      email: email,
      password: hashedPass,
    });

    await newUser
      .save()
      .then(() => {
        res.status(200).json({ status: 'success', message: 'User registered' });
      })
      .catch(err => {
        console.log(err);
        res.status(200).json({ status: 'error', message: 'User not register' });
      });
  } catch (e) {
    console.log(e);
    res
      .status(200)
      .json({ status: 'error', message: 'User is not registered' });
  }
}

export async function userLogin(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        errors: errors.array(),
        status: 'error',
        message: 'Некорректные данные',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ status: 'error', message: 'User not found' });

    const isMath = await bcrypt.compare(password, user.password);
    if (!isMath)
      return res
        .status(200)
        .json({ status: 'error', message: 'User password is not true' });

    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
      expiresIn: '1h',
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    console.log(e);
    res.status(200).json({ status: 'error', message: 'User is not loginned' });
  }
}

export function userGetAll(req, res) {
  User.find()
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json('Error responce all users');
    });
}
