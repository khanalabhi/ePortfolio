const { json } = require('express');
var express = require('express');
var router = express.Router();
const repository = require('../repositories/market.repository');
const authService = require('../services/auth.service');
const ObjectId = require('mongodb').ObjectId;

const renderBadRequest = function (res) {
    res.status(400);
    res.render('error', { message: 'Bad Request', error: { status: 400 } });
}

const displayStock = function (db, id, res) {
    console.log(id);
    repository.readDocument(db, { _id: ObjectId(id) }, function (err, doc) {
        console.log(doc);
        if (err) {
            renderBadRequest(res);
        } else {
            res.render('market_view', { createdStock: JSON.stringify(doc) });
        }
    });
}

router.get('/create', function (req, res, next) {
    res.render('market_create');
});

router.post('/create', function (req, res, next) {
    const credentials = authService.extractInfo(req);
    authService.authenticated(credentials.username, credentials.password, function (user) {
        if (!user) {
            authService.renderUnauthorized(res);
        } else {
            if (!user.admin) {
                authService.renderProhibited(res);
            } else {
                let stockData = JSON.parse(req.body.stock_data);
                if (stockData) {
                    repository.createDocument(req.db, stockData, function (err, doc) {
                        if (err) {
                            renderBadRequest(res);
                        } else {
                            displayStock(req.db, doc['ops'][0]['_id'], res);
                        }
                    });
                } else {
                    renderBadRequest(res);
                }
            }
        }
    });
});

router.get('/update_volume', function (req, res, next) {
    res.render('update_volume');
});

router.post('/update_volume', function (req, res, next) {
    const credentials = authService.extractInfo(req);
    authService.authenticated(credentials.username, credentials.password, function (user) {
        if (!user) {
            authService.renderUnauthorized(res);
        } else {
            if (!user.admin) {
                authService.renderProhibited(res);
            } else {
                repository.updateVolume(req.db, req.body.ticker, req.body.volume, function (err, doc) {
                    res.render('update_volume', { err: err, doc: doc });
                });
            }
        }
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
