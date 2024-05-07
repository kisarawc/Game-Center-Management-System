// eventController.js
const Feedback = require('../../models/Radeesa/Feedback');
const Game = require('../../models/Saniru/Game');

exports.createFeedback = async (req, res) => {
  try {
    const { comment, rating, image_path, date, admin_feedback, user_id, game_id } = req.body;
    const newFeedback = new Feedback({ comment, rating, image_path, date, admin_feedback, user_id, game_id });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Delete the feedback
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json({ message: 'feedback deleted successfully' });
  } catch (error) {
    console.error('Error feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, req.body, { new: true });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }



};

exports.getFeedbacksByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed in the URL parameters
    const feedbacks = await Feedback.find({ user_id: userId }).populate('game_id');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGamesDropdown = async (req, res) => {
  try {
    const games = await Game.find({}, 'name');
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
