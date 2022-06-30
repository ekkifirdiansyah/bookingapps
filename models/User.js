const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please Input User Name!"],
    },
    email: {
      type: String,
      required: [true, "Please Input Email!"],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("Please Provide a valid email address!");
        }
      },
    },
    role: {
      type: String,
      enum: ["admin", "Owner"],
      default: "Owner",
    },
    password: {
      type: String,
      required: [true, "Please Input Password!"],
      minlength: 7, // min 7 char untuk password
      trim: true,
    },
    passwordComfrim: {
      type: String,
      minlength: 7,
      trim: true,
      required: [true, "Please Input Password Confirmation!"],
      validate(value) {
        if (this.password !== this.passwordComfrim) {
          return true;
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// generate token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    "Niomic",
    {
      expiresIn: "1 days", // waktu berdasarkan waktu dalam bahasa inggris
    }
  );

  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();
  return token;
};
// custom json convert
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.passwordComfrim;
  delete userObject.tokens;

  return userObject;
};

// login check
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw Error("User Not Found!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error("Wrong Password!");
  }
  return user;
};

// hashing password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  if (user.isModified("passwordComfrim")) {
    user.passwordComfrim = await bcrypt.hash(user.passwordComfrim, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;