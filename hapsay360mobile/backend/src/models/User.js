import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    profileImage: { type: String, default: "" },

    // Personal Info
    personal_info: {
      givenName: String,
      middleName: String,
      surname: String,
      qualifier: String,
      sex: String,
      civilStatus: String,
      birthdate: Date,
      isPWD: Boolean,
      isFirstTimeJobSeeker: Boolean,
      nationality: String,
      birthPlace: String,
      otherCountry: String,
    },

    // Contact / Address
    address: {
      houseNo: String,
      province: String,
      city: String,
      barangay: String,
      email: String,
      mobile: String,
      telephone: String,
    },

    // Other Info
    other_info: {
      height: String,
      weight: String,
      complexion: String,
      identifyingMarks: String,
      bloodType: String,
      religion: String,
      education: String,
      occupation: String,
    },

    // Family Info
    family: {
      father: {
        given: String,
        middle: String,
        surname: String,
        qualifier: String,
        birthPlace: String,
        otherCountry: String,
      },
      mother: {
        given: String,
        middle: String,
        surname: String,
        qualifier: String,
        birthPlace: String,
        otherCountry: String,
      },
      spouse: {
        given: String,
        middle: String,
        surname: String,
        qualifier: String,
      },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
