const { sign, verify } = require('jsonwebtoken');

exports.signPayload = (payload) => {
  return sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};
