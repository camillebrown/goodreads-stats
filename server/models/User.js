const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { type: String },
    googleId: {
      type: String,
      unique: false,
      sparse: true,
      validate: {
        validator: async function (value) {
          if (value) {
            const user = await mongoose.models.users.findOne({
              googleId: value,
            });
            return !user || user._id.equals(this._id);
          }
          return true;
        },
        message: "Google ID must be unique.",
      },
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model("users", userSchema);

module.exports = User;
