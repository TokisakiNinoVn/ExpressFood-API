const User = require('../models/User');
const { verifyAccessToken } = require('../utils/generateTokens');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      message: 'Not authorized to access this route',
      tokenExpired: false
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    next();
  } catch (error) {
    if (error.message.includes('expired')) {
      return res.status(401).json({ 
        message: 'Access token expired',
        tokenExpired: true
      });
    }
    return res.status(401).json({ 
      message: 'Invalid access token',
      tokenExpired: false
    });
  }
};

// Admin only routes
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

