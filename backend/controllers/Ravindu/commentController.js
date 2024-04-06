const Comment = require('../../models/Ravindu/Comment');

exports.getCommentsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const comments = await Comment.find({ eventId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { eventId } = req.params; // Assuming eventId is in the URL params

    // Create a new comment and set the eventId field
    const newComment = new Comment({ comment, eventId });

    // Save the new comment to the database
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




