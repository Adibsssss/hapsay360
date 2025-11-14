import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Contact subdocument schema for officers
const officerContactSchema = new mongoose.Schema({
    mobile_number: {
        type: String,
        required: false
    },
    radio_id: {
        type: String,
        required: false
    }
}, { _id: false });

const officerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    badge_number: {
        type: String,
        required: false,
        unique: true
    },
    rank: {
        type: String,
        required: false
    },
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PoliceStation',
        required: false
    },
    contact: {
        type: officerContactSchema,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
officerSchema.pre('save', async function(next) {
    this.updated_at = Date.now();
    
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Officer = mongoose.model('Officer', officerSchema);

export default Officer;

