const Booking = require('../../models/Chathuka/Booking');

// Controller function to get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: 'success',
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Controller function to create a new booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Controller function to get a single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({
        status: 'fail',
        message: 'Booking not found'
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Controller function to update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!booking) {
      res.status(404).json({
        status: 'fail',
        message: 'Booking not found'
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Controller function to delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(404).json({
        status: 'fail',
        message: 'Booking not found'
      });
      return;
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};
