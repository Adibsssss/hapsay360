import mongoose from 'mongoose';

// Location subdocument schema for incidents
const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, { _id: false });

// Incident subdocument schema
const incidentSchema = new mongoose.Schema({
    incident_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: { 
        type: String,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { _id: false });

// Attachments subdocument schema
const attachmentSchema = new mongoose.Schema({
    attachment_type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { _id: false });

const blotterSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: false
    },
    home_address: {
        type: String,
        required: true
    },
    incident: {
        type: incidentSchema,
        required: true
    },
    attachments: {
        type: [attachmentSchema],
        default: []
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
blotterSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Blotter = mongoose.model('Blotter', blotterSchema);

export default Blotter;

