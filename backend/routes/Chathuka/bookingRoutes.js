const express = require('express');
const bookingController = require('../../controllers/Chathuka/bookingController');

const router = express.Router();

//  get all bookings and create a new booking
router.route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

// get, update, or delete a single booking 
router.route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

  router.get('/user/:userId', bookingController.getBookingsByUserId);

  router.get('/getAllbookbyId/:userId', bookingController.getAllBookingsByUser)
router.route('/game/:gameName/:date')
  .get(bookingController.getBookingDetailsByGameAndDate);

  router.route('/game/:gameName/:date/:time')
  .get(bookingController.getBookingDetailsByGameAndDateAndTime);
module.exports = router;
