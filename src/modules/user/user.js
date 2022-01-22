import User from './Model';

export function userRegister(req, res) {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      res.status(200).json('User register');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('User not register');
    });
}

export function userGetAll(req, res) {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Error responce all users');
    });
}
