var MongoClient = require('mongodb').MongoClient;

/**
 * Operation function should take params (err, db)
 */
function performMongoOperation(operationFunction) {
    const url = "mongodb://localhost:27017/total-sellout";
    MongoClient.connect(url, operationFunction);
}

function storeItemFromTransaction(item) {
    performMongoOperation(function(err, db) {
        var collection = db.collection('transactionItem');
        collection.insertOne(item);
    });
}

exports.storeItemFromTransaction = storeItemFromTransaction;
