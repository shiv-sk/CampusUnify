const express = require('express');
const authMiddleware = require('./../middleware/authMiddleware');
const bookingsController = require('./../controllers/bookingsController');
const router = express.Router();

router.use(authMiddleware.protect);
router.get(
  '/',
  authMiddleware.restrictTo('user'),
  bookingsController.getUserRegistrations,
);

router.get(
  '/generateTicket/:id',
  authMiddleware.restrictTo('user'),
  bookingsController.generateTicket,
);

router.use(authMiddleware.restrictTo('club'));

router.get('/:eventId', bookingsController.getEventBookings);
router.get(
  '/:eventId/booking/:bookingId',
  bookingsController.getSingleEventDetails,
);
router.delete(
  '/:eventId/booking/:bookingId',
  bookingsController.deleteEventBooking,
);

module.exports = router;
