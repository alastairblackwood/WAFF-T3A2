const express = require('express');
const filmController = require('./../controllers/filmController');

const router = express.Router();

router.param('id', filmController.checkID);

router
  .route('/')
  .get(filmController.getAllFilms)
  .post(filmController.checkBody, filmController.createFilm);

router
  .route('/:id')
  .get(filmController.getFilm)
  .patch(filmController.updateFilm)
  .delete(filmController.deleteFilm);

module.exports = router;
