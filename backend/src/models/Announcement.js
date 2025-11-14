import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PoliceStation',
        required: false,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
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
announcementSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;

