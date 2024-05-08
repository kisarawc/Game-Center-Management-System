const Booking = require('../../models/Chathuka/Booking');
const Game = require('../../models/Saniru/Game');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};


exports.getAllBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId); // Assuming user ID is passed as a parameter
    const bookings = await Booking.find({ user_id: userId });
    
    // Check if bookings array is empty
    if (bookings.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No bookings found for the specified user ID'
      });
    }
    
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
}

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


exports.getBookingDetailsByGameAndDate = async (req, res) => {
  const { gameName, date } = req.params;

  try {
    const bookings = await Booking.find({ game_name: gameName, date: date }).exec();

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for the game and date.' });
    }
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBookingDetailsByGameAndDateAndTime = async (req, res) => {
  const { gameName, date, time } = req.params;

  try {
    const bookings = await Booking.find({ game_name: gameName, date: date, start_time: time }).exec();

    if (bookings.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getBookingsByUserId = async (req, res) => {
  const userId = req.params.userId; 

  try {
    // Find all bookings associated with the user ID
    const bookings = await Booking.find({ user_id: userId }).exec();

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for the user.' });
    }

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

