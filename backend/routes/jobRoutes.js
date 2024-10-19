const express = require('express');
const router = express.Router();
const { createJob, sendJobEmail } = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');

router.post('/create', auth, createJob);
router.post('/send-email', auth, sendJobEmail);

module.exports = router;
