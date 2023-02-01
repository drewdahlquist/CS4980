const express = require('express');

const router = express.Router();

// TODO: require db connection

router.route('/').post(function (req, res) {
    res.send(req.params);
});
  
router.route('/:userId')
.get(function (req, res) {
    res.send(req.params);
})
.put(function (req, res) {
    res.send(req.params);
})
.delete(function (req, res) {
    res.send(req.params);
});

module.exports = router;
