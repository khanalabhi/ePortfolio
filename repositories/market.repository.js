const createDocument = function (db, data, callback) {
    callback(null, null);
};

const readDocument = function (db, lookup, callback) {
    callback(null, null);
}

const getSimpleMovingAverageCount = function (db, low, high, callback) {
    callback(null, null);
}

const getTickersForIndustry = function (db, industry, callback) {
    callback(null, null);
}

const getSharesByIndustry = function (db, sector, callback) {
    callback(null, null);
}

const updateDocument = function (db, ticker, volume, callback) {
    callback(null, null);
}

const deleteDocument = function (db, lookup, callback) {
    callback(null, null);
}

const deleteTicker = function (db, ticker, callback) {
    callback(null, null);
}

const summaryForTickers = function (db, tickers, callback) {
    callback(null, null);
}

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
    deleteDocument: deleteDocument,
    deleteTicker: deleteTicker,
    summaryForTickers: summaryForTickers,
    topFiveStocks: topFiveStocks,
}