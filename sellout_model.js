var MongoClient = require('mongodb').MongoClient;

/**
 * Operation function should take params (err, db)
 */
function performMongoOperation(operationFunction) {
    const url = "mongodb://localhost:27017/total-sellout";
    MongoClient.connect(url, operationFunction);
}

function storeItemFromTransaction(item) {
    var itemToInsert = {
        customer: item.customer,
        vendor: item.vendor,
        itemName: item.itemName,
        cost: item.cost
    };

    performMongoOperation(function(err, db) {
        var collection = db.collection('transactionItem');
        collection.insertOne(itemToInsert);
    });
}

function getVendorCustomerData(vendor, callback) {
    var customerDataMap = {};

    performMongoOperation(function(err, db) {
        var collection = db.collection('transactionItem');
        var query = {vendor: vendor};

        collection.find(query).each(function(err, doc) {
            if(doc == null) {
                callback(err, customerDataMap);
            }
            else {
                var customerId = doc.customer;
                if(typeof customerDataMap[customerId] == "undefined") {
                    customerDataMap[customerId] = {};
                }

                var vendorName = doc.vendor;
                if(typeof customerDataMap[customerId][vendorName] == "undefined") {
                    customerDataMap[customerId][vendorName] = {};
                    console.log("woolad");
                }

                var itemName = doc.itemName;
                if(typeof customerDataMap[customerId][vendorName][itemName] == "undefined") {
                    customerDataMap[customerId][vendorName][itemName] = 0;
                }
                ++customerDataMap[customerId][vendorName][itemName];
            }
        });
    });
};


exports.storeItemFromTransaction = storeItemFromTransaction;
exports.getVendorCustomerData = getVendorCustomerData;
