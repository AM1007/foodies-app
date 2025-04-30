import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  });
};

const verifyToken = token => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      payload,
      error: null,
    };
  } catch (error) {
    return { payload: null, error };
  }
};

export default { generateToken, verifyToken };
