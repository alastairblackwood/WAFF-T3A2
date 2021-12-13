const express = require('express');
const filmController = require('./../controllers/filmController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', filmController.checkID);

router
  .route('/')
  .get(authController.protect, filmController.getAllFilms)
  .post(filmController.createFilm);

router
  .route('/:id')
  .get(filmController.getFilm)
  .patch(filmController.updateFilm)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    filmController.deleteFilm
  );

module.exports = router;
