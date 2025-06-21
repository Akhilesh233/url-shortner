import express from 'express';
import connectDB from './config/db.js';
import getShorten from './routes/urlRoutes.js';
import redirect from './routes/url.js';

const app = express();

app.use(express.json({ extended: false}));

// Define Routes
app.use('/api/url', getShorten);
app.use('/', redirect);

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});