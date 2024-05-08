const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/Shavindi/paymentController');

router.post('/createPayment', paymentController.createPayment);
router.post('/getdatabasedonData', paymentController.getPaymentsByDateRange);
router.get('/getAll',paymentController.getAllPayments);
router.get("/getlatestPayment/:userId",paymentController.getLatestPaymentByUserID);


module.exports = router;