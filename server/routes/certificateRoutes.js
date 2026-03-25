import express from 'express';
import {
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate,
} from '../controllers/certificateController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getCertificates).post(protect, admin, createCertificate);
router
    .route('/:id')
    .put(protect, admin, updateCertificate)
    .delete(protect, admin, deleteCertificate);

export default router;
