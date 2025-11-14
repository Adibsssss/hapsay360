import mongoose from 'mongoose';
import 'dotenv/config.js';
import { connectDB } from '../lib/db.js';

const dropUsernameIndex = async () => {
    try {
        await connectDB();
        
        // Wait a bit for connection to be fully established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const db = mongoose.connection.db;
        const collection = db.collection('users');
        
        // Get all indexes
        const indexes = await collection.indexes();
        console.log('Current indexes:', indexes);
        
        // Drop username index if it exists
        try {
            await collection.dropIndex('username_1');
            console.log('✅ Successfully dropped username_1 index');
        } catch (error) {
            if (error.code === 27) {
                console.log('ℹ️  username_1 index does not exist');
            } else {
                throw error;
            }
        }
        
        // Also try dropping any username index variations
        try {
            await collection.dropIndex('username');
            console.log('✅ Successfully dropped username index');
        } catch (error) {
            if (error.code === 27) {
                console.log('ℹ️  username index does not exist');
            } else {
                throw error;
            }
        }
        
        // Show updated indexes
        const updatedIndexes = await collection.indexes();
        console.log('Updated indexes:', updatedIndexes);
        
        process.exit(0);
    } catch (error) {
        console.error('Error dropping index:', error);
        process.exit(1);
    }
};

dropUsernameIndex();

