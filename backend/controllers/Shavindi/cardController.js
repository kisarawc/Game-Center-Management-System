const Card = require("../../models/Shavindi/Card");


exports.createCardDetails = async (req, res) => {
  try {
    const { card_no, name, cvv , expire_date, } = req.body;

    const card = await Card.create({
      card_no, name, cvv , expire_date,
    })

    res.status(201).json(card)


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
  
      // Delete the card
      const deletedCard = await Card.deleteOne({_id:"66204820dc780f55d5186bd0"});
  
      // if (!deletedCard) {
      //   return res.status(404).json({ error: 'Card not found' });
      // }

      res.json({message:"Deleted card"})

    } catch (error) {
      console.error('Error deleting the card:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updateCard = async (req, res) => {
    // const { cardId } = req.params;
    try {
      const updatedCard = await Card.findByIdAndUpdate("66204820dc780f55d5186bd0", req.body, { new: true });
      res.status(200).json(updatedCard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };