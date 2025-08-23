const express = require('express');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.');
    process.exit(1);
}

const authRoutes = require('./api-routes/auth');
const storeRoutes = require('./api-routes/store');
const adminRoutes = require('./api-routes/admin');
const userRoutes = require('./api-routes/user');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

db.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return db.sync();
    })
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection or sync failed:', err);
    })