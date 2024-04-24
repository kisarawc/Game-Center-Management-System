// app.js (or server.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");

const eventRoutes = require('./routes/Ravindu/eventRoutes'); 
const commentRoutes = require('./routes/Ravindu/commentRoutes');


const paymentRoutes = require('./routes/Shavindi/paymentRoutes');
const cardRoutes = require('./routes/Shavindi/cardRoutes');
const cookieParser = require("cookie-parser")


const userRoutes = require('./routes/Limasha/userRoutes');


const bookingRouter = require('./routes/Chathuka/bookingRoutes');
const userRouter = require('./routes/Ravindu/userRoutes');
const game = require('./routes/Chathuka/game');


require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());





app.use(cors(
    {
        origin: ["http://localhost:3001","https://Game-app.vercel.app"],
        credentials: true,
    }
));
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'GGLounge', 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    
    // Use event routes
    app.use('/api/events', eventRoutes);
    app.use('/api/events', commentRoutes);// Using '/api' as the base URL for event routes
    app.use('/api/users', userRoutes);



    app.use('/api/payments', paymentRoutes);
    app.use('/api/card-payments', cardRoutes);


    //booking routes
    app.use('/api/bookings', bookingRouter);
    app.use('/api/game', game);

    app.use('/api/users', userRouter);

    

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});
