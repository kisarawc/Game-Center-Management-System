const express = require('express');
const bookingController = require('../../controllers/Chathuka/bookingController');

const router = express.Router();

// Route to get all bookings and create a new booking
router.route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

// Route to get, update, or delete a single booking by ID
router.route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
