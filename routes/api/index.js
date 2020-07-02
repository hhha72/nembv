const router = require('express').Router();

router.all('*', (req, res, next) => {
    console.log(req.path + ' welcome to api');
    next();
});

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;