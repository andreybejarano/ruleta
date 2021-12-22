const router = require('express').Router();

const StudentController = require('../controllers/Student');

const RouletteController = require('../controllers/Roulette');

router.get('/student/random', StudentController.selectRandomStudent);
router.get('/student/selected', StudentController.getAllSeletedStudents);

module.exports = router;
