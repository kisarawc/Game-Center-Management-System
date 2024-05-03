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
    const { comment, userId } = req.body; // Extract userId from request body
    const { eventId } = req.params;

    // Create a new comment and set the eventId and userId fields
    const newComment = new Comment({ comment, eventId, userId });
    
    // Save the new comment to the database
    const savedComment = await newComment.save(); // Save the comment and capture the result

    res.status(201).json(savedComment); // Return the saved comment including the userId
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


