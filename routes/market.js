var express = require('express');
var router = express.Router();
const repository = require('../repositories/market.repository');
const authService = require('../services/auth.service');

router.post('/create', function (req, res, next) {
    const credentials = authService.extractInfo(req);
    authService.authenticated(credentials.username, credentials.password, function (user) {
        if (!user) {
            res.status(403);
            res.send({});
        } else {
            res.render('index', { title: 'market#create' });
        }
    });
});

router.get('/update_volume', function (req, res, next) {
    repository.updateVolume(req.db, null, null, function (err, doc) {
        res.render('index', { title: 'market#update_volume' });
    });
});

router.get('/delete', function (req, res, next) {
    repository.deleteDocument(req.db, null, function (err, doc) {
        res.render('index', { title: 'market#delete' });
    });
});

router.get('/moving_average_count', function (req, res, next) {
    repository.getSimpleMovingAverageCount(req.db, null, null, function (err, doc) {
        res.render('index', { title: 'market#moving_average_count' });
    });
});

router.get('/tickers_for_industry', function (req, res, next) {
    repository.getTickersForIndustry(req.db, null, function (err, doc) {
        res.render('index', { title: 'market#tickers_for_industry' });
    });
});

router.get('/shares_by_industry', function (req, res, next) {
    repository.getSharesByIndustry(req.db, null, function (err, doc) {
        res.render('index', { title: 'market#shares_by_industry' });
    });
});

router.get('/summary_for_tickers', function (req, res, next) {
    repository.summaryForTickers(req.db, null, function (err, doc) {
        res.render('index', { title: 'market#summary_for_tickers' });
    });
});

router.get('/top_five_stocks', function (req, res, next) {
    repository.topFiveStocks(req.db, null, function (err, doc) {
        res.render('index', { title: 'market#top_five_stocks' });
    });
});

module.exports = router;
