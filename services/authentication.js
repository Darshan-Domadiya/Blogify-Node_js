const jwt = require("jsonwebtoken");

const secret = "d@rshan#2024";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  return jwt.sign(payload, secret);
}

function verifyUserByToken(token) {
  if (!token) return null;

  return jwt.verify(token, secret);
}

module.exports = { createTokenForUser, verifyUserByToken };
