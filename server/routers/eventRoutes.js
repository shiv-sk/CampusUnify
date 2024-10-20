const express = require('express');
const eventController = require('./../controllers/eventController');
const authMiddleware = require('./../middleware/authMiddleware');

const router = express.Router();

router.route('/latestEvents').get(eventController.getLatestEvents);

router.use(authMiddleware.protect);

router
  .route('/eventDays/:eventId/day/:dayId')
  .get(eventController.getEventDay)
  .patch(eventController.updateEventDay)
  .delete(eventController.deleteEventDay);

router
  .route('/eventDays/:eventId')
  .get(eventController.getAllEventDays)
  .post(eventController.createEventDay);

router
  .route('/:id')
  .get(eventController.getSingleEvent)
  .patch(authMiddleware.restrictTo('club'), eventController.updateEvent)
  .delete(authMiddleware.restrictTo('club'), eventController.deleteEvent);

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(authMiddleware.restrictTo('club'), eventController.createEvent);

module.exports = router;
