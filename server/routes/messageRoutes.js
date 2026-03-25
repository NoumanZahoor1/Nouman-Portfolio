import express from 'express';
import {
  getMessages,
  getMessage,
  createMessage,
  markAsRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, admin, getMessages).post(createMessage);
router
  .route('/:id')
  .get(protect, admin, getMessage)
  .delete(protect, admin, deleteMessage);
router.route('/:id/read').put(protect, admin, markAsRead);

export default router;
