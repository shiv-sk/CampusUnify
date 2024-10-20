const express = require('express');
const authMiddleware = require('./../middleware/authMiddleware');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('user'));
router
  .route('/:eventId')
  .post(cartController.addToCart)
  .delete(cartController.deleteFromCart);

router.route('/').get(cartController.getCart).delete(cartController.clearCart);

module.exports = router;
