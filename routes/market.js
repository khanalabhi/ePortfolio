const { json } = require('express');
var express = require('express');
var router = express.Router();
const repository = require('../repositories/market.repository');
const authService = require('../services/auth.service');
const ObjectId = require('mongodb').ObjectId;

const renderBadRequest = function (res, message) {
    res.status(400);
    res.render('error', { flash: { failure: true, message: message }, message: 'Bad Request', error: { status: 400 } });
}

const displayStock = function (db, id, res) {
    console.log(id);
    repository.readDocument(db, { _id: ObjectId(id) }, function (err, doc) {
        console.log(doc);
        if (err) {
            renderBadRequest(res, 'Could not display the stock');
        } else {
            res.render('market_view', { flash: { success: true, message: 'Created a new stock entry' }, createdStock: JSON.stringify(doc) });
        }
    });
}

router.get('/create', function (req, res, next) {
    res.render('market_create');
});

router.post('/create', function (req, res, next) {
    authService.preventForbidden(req, res, function (_) {
        let stockData = {};
        try {
            stockData = JSON.parse(req.body.stock_data);
        } catch (_) {
            renderBadRequest(res, 'Invalid JSON formatting for stock data');
            return;
        }
        if (stockData) {
            repository.createDocument(req.db, stockData, function (err, doc) {
                if (err) {
                    renderBadRequest(res, 'Could not create the stock');
                } else {
                    displayStock(req.db, doc['ops'][0]['_id'], res);
                }
            });
        } else {
            renderBadRequest(res);
        }
    });
});

router.get('/update_volume', function (req, res, next) {
    res.render('update_volume');
});

router.post('/update_volume', function (req, res, next) {
    authService.preventForbidden(req, res, function (_) {
        repository.updateVolume(req.db, req.body.ticker, req.body.volume, function (err, doc) {
            let flash = {};
            if (err) {
                flash.failure = true;
                flash.message = 'Failed to update volume';
            } else {
                flash.success = true;
                flash.message = 'Updated the volume';
            }
            res.render('update_volume', { err: err, flash: flash });
        });
    });
});

router.post('/delete', function (req, res, next) {
    authService.preventForbidden(req, res, function (_) {
        repository.deleteTicker(req.db, req.body.ticker, function (err, doc) {
            if (err) {
                res.render('delete', { flash: { failure: true, message: 'Could not delete stock' } });
            } else {
                res.render('delete', { flash: { success: true, message: 'Successfully deleted stock ' } });
            }
        });
    });
});

router.get('/delete', function (req, res, next) {
    res.render('delete');
});

router.post('/moving_average_count', function (req, res, next) {
    authService.preventUnauthorized(req, res, function (_) {
        repository.getSimpleMovingAverageCount(req.db, req.body.low, req.body.high, function (err, cnt) {
            if (err) {
                res.render('moving_average_count', { flash: { failure: true, message: 'Failed to get moving average count' } });
                return;
            }
            res.render('moving_average_count', { cnt: cnt, flash: { success: true, message: 'Successfuly retrieved the moving average count ' } });
        });
    });
});

router.get('/moving_average_count', function (req, res, next) {
    res.render('moving_average_count');
});

router.post('/tickers_for_industry', function (req, res, next) {
    authService.preventUnauthorized(req, res, function (_) {
        repository.getTickersForIndustry(req.db, req.body.industry, function (err, tickers) {
            if (err) {
                res.render('tickers_for_industry', { flash: { failure: true, message: 'Failed to get tickers' } });
                return;
            }
            res.render('tickers_for_industry', { flash: { success: true, message: `Successfully retrieved ${tickers.length} tickers` }, tickers: tickers });
        });
    });
});

router.get('/tickers_for_industry', function (req, res, next) {
    res.render('tickers_for_industry');
});

router.get('/shares_by_industry', function (req, res, next) {
    res.render('shares_by_industry');
});

router.post('/shares_by_industry', function (req, res, next) {
    authService.preventUnauthorized(req, res, function (_) {
        repository.getSharesByIndustry(req.db, req.body.sector, function (err, shares) {
            if (err) {
                res.render('shares_by_industry', { flash: { failure: true, message: 'Failed to get shares' } });
                return;
            }
            res.render('shares_by_industry', {
                flash: { success: true, message: `Successfully retrieved ${shares.length} shares` }, shares: shares
            });
        });
    });
});

router.post('/summary_for_tickers', function (req, res, next) {
    authService.preventUnauthorized(req, res, function (_) {
        repository.summaryForTickers(req.db, req.body.tickers.split(',').map(function (ticker) { return ticker.trim() }), function (err, summaries) {
            if (err) {
                res.render('summary_for_tickers', { flash: { failure: true, message: 'Failed to get summaries' } });
                return;
            }
            res.render('summary_for_tickers', {
                flash: { success: true, message: `Successfully retrieved ${summaries.length} summaries` }, summaries: summaries
            });
        });
    });
});

router.get('/summary_for_tickers', function (req, res, next) {
    res.render('summary_for_tickers');
});

router.post('/top_five_stocks', function (req, res, next) {
    repository.topFiveStocks(req.db, null, function (err, doc) {
        res.render('top_five_stocks');
    });
});

router.get('/top_five_stocks', function (req, res, next) {
    res.render('top_five_stocks');
});

module.exports = router;
