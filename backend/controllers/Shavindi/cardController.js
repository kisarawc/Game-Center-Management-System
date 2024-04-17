const Card = require("../../models/Shavindi/Card");


exports.createCardDetails = async (req, res) => {
  try {
    const { card_no, name, cvv , expire_date, card_type} = req.body;
      
      // Create new payment
      const newCard = new Card({  card_no, name, cvv , expire_date, card_type});

      // Save payment
      const savedCard = await newCard.save();

      // // Save card details
      // const { card_no, name, cvv , expire_date, card_type} = card_details;
      // const newCard = new Card({ card_no, name, cvv, expire_date, card_type: savedPayment.user_id });
      // await newCard.save();

      res.status(201).json(savedCard);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

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

      res.json({message:"Deleted card"})

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