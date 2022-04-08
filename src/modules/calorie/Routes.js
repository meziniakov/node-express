import { Router } from 'express';
import Calorie from '../../models/Calorie';

const router = Router();

router.get('/', (req, res) => {
  Calorie.find()
    .then(meals => res.json(meals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const calories = Number(req.body.calories);
  const date = Date.parse(req.body.date);

  const addCalorie = new Calorie({
    username,
    description,
    calories,
    date,
  });

  addCalorie
    .save()
    .then(() => res.json('Calories Added Successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  Calorie.findById(req.params.id)
    .then(calories => res.json(calories))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  Calorie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Calories is deleted Successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Calorie.findById(req.params.id)
    .then(calories => {
      calories.username = req.body.username;
      calories.description = req.body.description;
      calories.calories = Number(req.body.calories);
      calories.date = Date.parse(req.body.date);
      calories
        .save()
        .then(() => res.json('Calorie Updated Successfully'))
        .catch(err => res.status(400).json('Err: ' + err));
    })
    .catch(err => res.status(400).json('Err: ' + err));
});

export default router;
