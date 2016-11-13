exports.storeItemFromTransaction = storeItemFromTransaction;
exports.getVendorCustomerData = getVendorCustomerData;

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
        cost: item.cost,
        number: item.number
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
                var vendorCustomerData = [];

                (function formatData() {
                    for(var customerKey in customerDataMap) {
                        var customerObject = {
                            customer: customerKey,
                            vendors: [],
                            number: customerDataMap[customerKey]['number']
                        };

                        var vendors = customerDataMap[customerKey];
                        for(var vendor in vendors) {
                            var vendorObject = {
                                vendor: vendor,
                                transactionItems : []
                            };

                            var transactionItems = vendors[vendor];
                            for(var transactionItemName in transactionItems) {
                                var transactionItem = {
                                    item: transactionItemName,
                                    quantity: transactionItems[transactionItemName]
                                };

                                vendorObject.transactionItems.push(transactionItem);
                            }

                            customerObject.vendors.push(vendorObject);
                        }

                        vendorCustomerData.push(customerObject);
                    }
                })()

                callback(err, vendorCustomerData);
            }
            else {
                var customerId = doc.customer;
                if(typeof customerDataMap[customerId] == "undefined") {
                    customerDataMap[customerId] = {};
                }

                if(doc.number) {
                    customerDataMap[customerId].number = doc.number;
                }

                var vendorName = doc.vendor;
                if(typeof customerDataMap[customerId][vendorName] == "undefined") {
                    customerDataMap[customerId][vendorName] = {};
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
