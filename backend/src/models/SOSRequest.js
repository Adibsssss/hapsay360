import mongoose from 'mongoose';

// Location subdocument schema for SOS requests (Number coordinates)
const sosLocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, { _id: false });

const sosRequestSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nearest_station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PoliceStation',
        required: true
    },
    location: {
        type: sosLocationSchema,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
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
sosRequestSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const SOSRequest = mongoose.model('SOSRequest', sosRequestSchema);

export default SOSRequest;

