const path = require('path');
const express = require('express');
const colors = require('colors');
const {errorHandler} = require("./middleware/errorMiddleware");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Server frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*',
        (req, res) => res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );

} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorHandler);


app.listen(PORT, () => {
    console.log('Server is listening...')
})