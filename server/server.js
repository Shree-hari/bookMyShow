require('dotenv').config(); // for .env file
const path = require('path');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconfig');
const userRouter = require('./routes/userRoute');
const movieRouter = require('./routes/movieRoute');
const theatreRouter = require('./routes/theatreRoute');
const showRouter = require('./routes/showRoute');
const bookingRouter = require('./routes/bookingRoute');
const app = express();

// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'","'unsafe-eval'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         fontSrc: ["'self'", "'https://fonts.gstatic.com'"],
//         imgSrc: ["'self'", "data:"],
//     },
// }));

app.use(helmet());
app.use(cors(
    {
        origin: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
        method: ["GET", "POST", "PUT", "DELETE"],
    }
));

const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);

app.use(express.static(clientBuildPath));

// app.use(cors())
app.use(express.json());


app.use("/api/bookings/verify", express.raw({ type: "application/json" }));

connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

// Routes
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use("/api/shows", showRouter);
app.use('/api/bookings', bookingRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(8082, () => {
    console.log('Server is running on port 8082');
})