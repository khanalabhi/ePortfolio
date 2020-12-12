/**
 * Create a new inspection with the key value pairs contained
  in the data dictionary
 * @param {*} db 
 * @param {*} data 
 * @param {*} callback 
 */
const createDocument = function (db, data, callback) {
    db.collection('stock').insertOne(data, function (err, res) {
        callback(err, res);
    });
};

/**
 * Find an inspection matching the key value lookup criteria
  in the lookup dictionary
 * @param {*} db 
 * @param {*} lookup 
 * @param {*} callback 
 */
const readDocument = function (db, lookup, callback) {
    db.collection('stock').findOne(lookup, function (err, doc) {
        callback(err, doc);
    });
}

/**
 * Count the number of documents whose 50-Day Simple Moving
  Average falls between the low and high values
 * @param {*} db 
 * @param {*} low 
 * @param {*} high 
 * @param {*} callback 
 */
const getSimpleMovingAverageCount = function (db, low, high, callback) {
    db.collection('stock').countDocuments({
        "50-Day Simple Moving Average":
            { "$gte": parseFloat(low), "$lte": parseFloat(high) }
    }, function (err, cnt) {
        callback(err, cnt);
    });
}

/**
 * Find and list all the tickers that belong to the given industry
 * @param {*} db 
 * @param {*} industry 
 * @param {*} callback 
 */
const getTickersForIndustry = function (db, industry, callback) {
    db.collection('stock').find({ 'Industry': { '$eq': industry } }, { '_id': 0, 'Ticker': 1 }).toArray(function (err, docs) {
        callback(err, docs.map(function (doc) {
            return doc['Ticker'];
        }));
    });
}

/**
 * Aggregate total outstanding shares by industry for the given sector
 * @param {*} db 
 * @param {*} sector 
 * @param {*} callback 
 */
const getSharesByIndustry = function (db, sector, callback) {
    callback(null, null);
}

/**
 * Update a document with contents of data dictionary by finding
  the document using lookup dictionary
 * @param {*} db 
 * @param {*} lookup 
 * @param {*} data 
 * @param {*} callback 
 */
const updateDocument = function (db, lookup, data, callback) {
    db.collection('stock').updateOne(lookup, { "$set": data }, function (err, res) {
        if (!err && res.modifiedCount == 0) {
            callback({ message: 'ticker not found' }, null);
            return;
        }
        callback(err, res);
    });
}

/**
 * Update the "volume" of the "ticker" - provided "volume" > 0
 * @param {*} db 
 * @param {*} ticker 
 * @param {*} volume 
 * @param {*} callback 
 */
const updateVolume = function (db, ticker, volume, callback) {
    if (!volume || volume < 1) {
        callback({ message: 'invalid volume' });
        return;
    }
    updateDocument(db, { "Ticker": ticker }, { "Relative Volume": volume }, callback);
}

/**
 * Look up a document and delete it
 * @param {*} db 
 * @param {*} lookup 
 * @param {*} callback 
 */
const deleteDocument = function (db, lookup, callback) {
    db.collection('stock').deleteOne(lookup, function (err, res) {
        if (!err && res.result.n == 0) {
            callback({ message: 'document not found' });
            return;
        }
        callback(err, res);
    });
}

/**
 * Delete the document with the given ticker symbol
 * @param {*} db 
 * @param {*} ticker 
 * @param {*} callback 
 */
const deleteTicker = function (db, ticker, callback) {
    deleteDocument(db, { Ticker: ticker }, callback);
}

/**
 * Get the summary for all the tickers
 * @param {*} db 
 * @param {*} tickers 
 * @param {*} callback 
 */
const summaryForTickers = function (db, tickers, callback) {
    callback(null, null);
}

/**
 * Get the top five stocks for any industry
 * @param {*} db 
 * @param {*} industry 
 * @param {*} callback 
 */
const topFiveStocks = function (db, industry, callback) {
    callback(null, null);
}

module.exports = {
    createDocument: createDocument,
    readDocument: readDocument,
    getSimpleMovingAverageCount: getSimpleMovingAverageCount,
    getTickersForIndustry: getTickersForIndustry,
    getSharesByIndustry: getSharesByIndustry,
    updateDocument: updateDocument,
    updateVolume: updateVolume,
    deleteDocument: deleteDocument,
    deleteTicker: deleteTicker,
    summaryForTickers: summaryForTickers,
    topFiveStocks: topFiveStocks,
}