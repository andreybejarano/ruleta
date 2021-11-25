const router = require('express').Router();

const RouletteController = require('../controllers/Roulette');

router.get('/run', RouletteController.run);

module.exports = router;