const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Dashboard Login');
})

router.get('/time', (req, res) => {
  res.send('Timer page');
})

router.get('/pomodoro', (req, res) => {
  res.send('Pomodoro Page');
})
router.get('/points', (req, res) => {
  res.send('Points Page');
})

module.exports = router;