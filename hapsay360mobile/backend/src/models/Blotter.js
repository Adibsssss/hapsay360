// models/Blotter.js
import mongoose from "mongoose";

const blotterSchema = new mongoose.Schema(
  {
    // Link to User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reporter Information (from User or manual entry)
    reporter: {
      fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
      },
      contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
    },

    // Incident Details
    incident: {
      type: {
        type: String,
        required: [true, "Incident type is required"],
        enum: ["Theft", "Assault", "Accident", "Other"],
        default: "Theft",
      },
      date: {
        type: String,
        required: [true, "Incident date is required"],
      },
      time: {
        type: String,
        required: [true, "Incident time is required"],
      },
      location: {
        latitude: {
          type: Number,
          required: [true, "Latitude is required"],
        },
        longitude: {
          type: Number,
          required: [true, "Longitude is required"],
        },
        address: {
          type: String,
          default: "",
        },
      },
      description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"],
      },
    },

    // Attachments/Evidence
    attachments: {
      photos: [
        {
          type: String, // Store file URLs or paths
        },
      ],
      videos: [
        {
          type: String,
        },
      ],
      documents: [
        {
          name: String,
          url: String,
        },
      ],
    },

    // Selected Police Station
    policeStation: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: [true, "Police station name is required"],
      },
      address: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      distance: {
        type: Number, // in kilometers
        required: true,
      },
      estimatedTime: {
        type: Number, // in minutes
        required: true,
      },
    },

    // Status tracking
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Investigating", "Resolved", "Closed"],
      default: "Pending",
    },

    // Blotter reference number (auto-generated)
    blotterNumber: {
      type: String,
      unique: true,
    },

    // Admin notes (optional)
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Pre-save hook to generate blotter number
blotterSchema.pre("save", async function (next) {
  if (!this.blotterNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    // Count documents to generate sequence
    const count = await mongoose.model("Blotter").countDocuments();
    const sequence = String(count + 1).padStart(6, "0");

    this.blotterNumber = `BLT-${year}${month}-${sequence}`;
  }
  next();
});

// Indexes for faster queries
blotterSchema.index({ status: 1, created_at: -1 });
blotterSchema.index({ userId: 1 });
blotterSchema.index({ "reporter.contactNumber": 1 });

const Blotter = mongoose.model("Blotter", blotterSchema);

export default Blotter;
