// file: app/app.js

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const publicRoutes = require('./routes/public/index');
const privateRoutes = require('./routes/private/index');
const adminRoutes = require('./routes/admin/index');
const { protect, adminOnly } = require('./middleware/auth');

const app = express();

app.set('trust proxy', 1);

/* ---------------------- Security Middlewares ---------------------- */
// Thiết lập các HTTP header bảo mật
app.use(helmet());

// Bật CORS (tùy chọn cấu hình origin cho production)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Giới hạn request từ cùng 1 IP (phòng chống DDoS & brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 request / 15 phút / 1 IP
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api', limiter);

// Ngăn tấn công NoSQL Injection
app.use(mongoSanitize());

// Ngăn tấn công HTTP Parameter Pollution
app.use(hpp());

/* ---------------------- Body Parser ---------------------- */
app.use(express.json({ limit: '10kb' })); // Giới hạn kích thước JSON tránh payload lớn
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* ---------------------- Routes ---------------------- */
app.use('/api/public', publicRoutes);
app.use('/api/private', protect, privateRoutes);
app.use('/api/admin', protect, adminOnly, adminRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to FoodExpress API' });
});

/* ---------------------- Global Error Handler ---------------------- */
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
});

module.exports = app;
