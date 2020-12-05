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
    callback(null, null);
}

/**
 * Find and list all the tickers that belong to the given industry
 * @param {*} db 
 * @param {*} industry 
 * @param {*} callback 
 */
const getTickersForIndustry = function (db, industry, callback) {
    callback(null, null);
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
    callback(null, null);
}

/**
 * Update the "volume" of the "ticker" - provided "volume" > 0
 * @param {*} db 
 * @param {*} ticker 
 * @param {*} volume 
 * @param {*} callback 
 */
const updateVolume = function (db, ticker, volume, callback) {
    db.collection('stock').updateOne({ "Ticker": ticker }, { "$set": { "Relative Volume": volume } }, function (err, res) {
        callback(err, res);
    });
}

/**
 * Look up a document and delete it
 * @param {*} db 
 * @param {*} lookup 
 * @param {*} callback 
 */
const deleteDocument = function (db, lookup, callback) {
    callback(null, null);
}

/**
 * Delete the document with the given ticker symbol
 * @param {*} db 
 * @param {*} ticker 
 * @param {*} callback 
 */
const deleteTicker = function (db, ticker, callback) {
    callback(null, null);
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