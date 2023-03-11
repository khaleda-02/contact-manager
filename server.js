const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorMiddleware');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express()


connectDb();
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler)

app.listen(PORT);