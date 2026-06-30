const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;