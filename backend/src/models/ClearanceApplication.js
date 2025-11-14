import mongoose from 'mongoose';

// Payment subdocument schema
const paymentSchema = new mongoose.Schema({
    processor: {
        type: String,
        required: false
    },
    transaction_id: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
}, { _id: false });

const clearanceApplicationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PoliceStation',
        required: false
    },
    purpose: {
        type: String,
        required: true,
    },
    appointment_date: {
        type: Date,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    payment: {
        type: paymentSchema,
        required: false
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

// Update updated_at before saving
clearanceApplicationSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const ClearanceApplication = mongoose.model('ClearanceApplication', clearanceApplicationSchema);

export default ClearanceApplication;

