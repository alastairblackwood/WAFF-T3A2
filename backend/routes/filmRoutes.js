const express = require('express');
const filmController = require('./../controllers/filmController');

const router = express.Router();

// router.param('id', filmController.checkID);

router
  .route('/top-5-cheap')
  .get(filmController.aliasTopFilms, filmController.getAllFilms);

router.route('/film-stats').get(filmController.getFilmStats);
router.route('/monthly-plan/:year').get(filmController.getMonthlyPlan);

router
  .route('/')
  .get(filmController.getAllFilms)
  .post(filmController.createFilm);

router
  .route('/:id')
  .get(filmController.getFilm)
  .patch(filmController.updateFilm)
  .delete(filmController.deleteFilm);

module.exports = router;
