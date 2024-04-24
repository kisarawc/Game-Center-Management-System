const Payment = require('../../models/Shavindi/Payment');
const Card = require('../../models/Shavindi/Card');

exports.createPayment = async (req, res) => {
    try {
        const { amount, time, date, payment_method,userID,bookID} = req.body;
        const payment = await Payment.create({
            amount:amount,
            time:time,
            date:date,
            payment_method:payment_method,
            booking_id:bookID,
            user_id:userID,
        })

        console.log(payment);

        res.status(201).json(payment);
        
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



