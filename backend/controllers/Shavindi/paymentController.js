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

        res.status(200).json({ response_code :200 ,payment});
        
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPaymentsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        
        // Convert start and end dates to Date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        
        // Adjust end date to include payments on the end date
        endDateObj.setDate(endDateObj.getDate() + 1);

        // Query payments based on date range (inclusive of start and end date)
        const payments = await Payment.find({
            date: { $gte: startDateObj, $lte: endDateObj }
        });

        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllPayments = async (req, res) => {
    try {
        // Query all payments
        const payments = await Payment.find();

        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getLatestPaymentByUserID = async (req, res) => {
    try {
        const { userID } = req.body;
        
        // Query payments for the specified user ID, sorted by date in descending order
        const payments = await Payment.find({ user_id: userID })
                                    .sort({ date: -1 })
                                    .limit(1);

        if (payments.length === 0) {
            return res.status(404).json({ message: "No payments found for the user." });
        }

        res.status(200).json(payments[0]); // Return the latest payment
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
