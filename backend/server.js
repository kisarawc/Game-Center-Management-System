// app.js (or server.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/Ravindu/eventRoutes'); 
const commentRoutes = require('./routes/Ravindu/commentRoutes');
const bodyParser = require("body-parser");

const gameRoutes = require('./routes/Saniru/gameRoutes');

const userRoutes = require('./routes/Limasha/userRoutes');


const bookingRouter = require('./routes/Chathuka/bookingRoutes');
const userRouter = require('./routes/Ravindu/userRoutes');
const game = require('./routes/Chathuka/game');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(
    {
        origin: ["http://localhost:3000","https://pinvent-app.vercel.app"],
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({extended :false})) ;
app.use(bodyParser.json());
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'GGLounge', 
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    
    // Use event routes
    app.use('/api/events', eventRoutes);

    app.use('/api/games', gameRoutes);

    app.use('/api/events', commentRoutes);// Using '/api' as the base URL for event routes
    app.use('/api/users', userRoutes);

    //booking routes
    app.use('/api/bookings', bookingRouter);
    app.use('/api/game', game);
    app.use('/api/users', userRouter);
    

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on prt ${PORT}`);
    });
})
.catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});