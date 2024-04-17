const Payment = require('../../models/Shavindi/Payment');
const Card = require('../../models/Shavindi/Card');

exports.createPayment = async (req, res) => {
    try {
        const { amount, time, date, payment_method, booking_id, user_id} = req.body;
        
        // Create new payment
        const newPayment = new Payment({ amount, time, date, payment_method, booking_id, user_id });

        // Save payment
        const savedPayment = await newPayment.save();

        // // Save card details
        // const { card_no, name, cvv , expire_date, card_type} = card_details;
        // const newCard = new Card({ card_no, name, cvv, expire_date, card_type: savedPayment.user_id });
        // await newCard.save();

        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



