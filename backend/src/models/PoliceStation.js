import mongoose from 'mongoose';

// Contact subdocument schema for police stations
const stationContactSchema = new mongoose.Schema({
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    landline: {
        type: String,
        required: true
    }
}, { _id: false });

// Location subdocument schema for police stations (String coordinates)
const stationLocationSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, { _id: false });

const policeStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: stationContactSchema,
        required: true
    },
    location: {
        type: stationLocationSchema,
        required: false
    },
    officer_IDs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Officer',
        default: []
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
policeStationSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const PoliceStation = mongoose.model('PoliceStation', policeStationSchema);

export default PoliceStation;

