const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const dotenv = require('dotenv');

const publicRoutes = require('./routes/public/index');
const privateRoutes = require('./routes/private/index');
const adminRoutes = require('./routes/admin/index');
const { protect, adminOnly } = require('./middleware/auth');

const app = express();
app.set('trust proxy', 1);
const corsFrontend = process.env.FRONTEND_ORIGIN;
console.log(corsFrontend);

/* ---------------------- Security Middlewares ---------------------- */
app.use(helmet());

app.use(cors({
  origin: corsFrontend || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api', limiter);

app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* ---------------------- Request Logger ---------------------- */
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });
  next();
});

/* ---------------------- Routes ---------------------- */
app.use('/api/public', publicRoutes);
app.use('/api/private', protect, privateRoutes);
app.use('/api/admin', protect, adminOnly, adminRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to FoodExpress API' });
});

/* ---------------------- 404 Not Found Handler ---------------------- */
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
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
