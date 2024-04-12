const Card = require("../../models/Shavindi/Card");

exports.getCardDetails = async (req, res) => {
    try {
      const cards = await Card.find();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteCard = async (req, res) => {
    try {
      const { cardId } = req.params;
  
      // Delete the card
      const deletedCard = await Card.findByIdAndDelete(cardId);
  
      if (!deletedCard) {
        return res.status(404).json({ error: 'Card not found' });
      }

    } catch (error) {
      console.error('Error deleting the card:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updateCard = async (req, res) => {
    const { cardId } = req.params;
    try {
      const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
      res.status(200).json(updatedCard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };