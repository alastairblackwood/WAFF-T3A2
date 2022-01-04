const express = require('express');
const reservationController = require('./../controllers/reservationController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/reservations/:id', reservationController.getCheckoutSession);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(reservationController.getAllBookings)
  .post(bookingController.createBooking);

router('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.delete);

module.exports = router;
