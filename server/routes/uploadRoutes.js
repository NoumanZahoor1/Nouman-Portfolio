import express from 'express';
import upload from '../middleware/upload.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({
            url: req.file.path,
            public_id: req.file.filename,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
