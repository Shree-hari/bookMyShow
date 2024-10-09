require('dotenv').config(); // for .env file

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const movieRouter = require('./routes/movieRoute');
const theatreRouter = require('./routes/theatreRoute');
const showRouter = require('./routes/showRoute');
const bookingRouter = require('./routes/bookingRoute');
const app = express();

app.use(cors())
app.use(express.json());

connectDB();

// Routes
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use("/api/shows", showRouter);
app.use('/api/bookings', bookingRouter);

app.listen(8082, () => {
    console.log('Server is running on port 8082');
})