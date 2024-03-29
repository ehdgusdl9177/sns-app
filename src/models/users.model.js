const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 4,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    kakaoId: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      default: "Frist Name",
    },
    lastName: {
      type: String,
      default: "Last Name",
    },
    bio: {
      type: String,
      default: "데이터 없음",
    },
    hometown: {
      type: String,
      default: "데이터 없음",
    },
    workplace: {
      type: String,
      default: "데이터 없음",
    },
    education: {
      type: String,
      default: "데이터 없음",
    },
    contact: {
      type: Number,
      default: 0101234567,
    },
    friends: [{ type: String }],
    friendRequests: [{ type: String }],
  },
  { timestamps: true }
);

const saltRounds = 10;
userSchema.pre("save", function (next) {
  let user = this;
  // 비밀번호가 변경될 때만
  if (user.isModified("password")) {
    // salt를 생성합니다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // bcrypt compare 비교
  // plain password  => client , this.password => 데이터베이스에 있는 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
