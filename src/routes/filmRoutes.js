const express = require('express');
const filmController = require('./../controllers/filmController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', filmController.checkID);

router
  .route('/')
  .get(filmController.getAllFilms)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    filmController.createFilm
  );

router
  .route('/:id')
  .get(filmController.getFilm)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    filmController.uploadFilmImages,
    filmController.resizeFilmImages,
    filmController.updateFilm
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    filmController.deleteFilm
  );

module.exports = router;
