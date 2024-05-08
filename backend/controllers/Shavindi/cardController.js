const { response } = require("express");
const Card = require("../../models/Shavindi/Card");


exports.createCardDetails = async (req, res) => {
  try {
    const { card_no, name, cvv , expire_date,user_id } = req.body;

    const card = await Card.create({
      card_no, name, cvv , expire_date,user_id
    })

    res.status(200).json({ message: 'payment succsfull',response_code :200 });


  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getCardDetails = async (req, res) => {
    try {
      const cards = await Card.findOne({_id:"66204820dc780f55d5186bd0"});
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteCard = async (req, res) => {
    try {
      // const { cardId } = req.params;
      const { cardId } = req.params;

      // Delete the card
      const deletedCard = await Card.deleteOne({_id:cardId});
  
       if (!deletedCard) {
        return res.status(404).json({ error: 'Card not found' });
      }

      res.status(200).json({ message: 'Card  delete',response_code :200 });

    } catch (error) {
      console.error('Error deleting the card:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.getCardDetailsByUserId = async (req, res) => {
    try {
      const {userId} = req.params;
      console.log(userId); // Assuming userId is passed as a parameter
      const cards = await Card.findOne({ user_id: userId });
      console.log(cards); // Query cards associated with the user
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateCard = async (req, res) => {
    try {
      const { cardId } = req.params;
      const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
      res.status(200).json({ message: "card details update",updatedCard});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  