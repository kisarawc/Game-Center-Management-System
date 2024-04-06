// eventController.js
const Event = require('../../models/Ravindu/Event');
const Comment = require('../../models/Ravindu/Comment');

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, imagePath } = req.body;
        const newEvent = new Event({ title, description, date, imagePath });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Delete the event
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Delete the comments associated with the event
    await Comment.deleteMany({ eventId });

    res.status(200).json({ message: 'Event and associated comments deleted successfully' });
  } catch (error) {
    console.error('Error deleting event and associated comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
