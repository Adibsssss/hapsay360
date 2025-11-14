import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import routes from './routes/index.js'; // Import all routes from index
import { connectDB } from './lib/db.js';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount all routes with /api prefix
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

