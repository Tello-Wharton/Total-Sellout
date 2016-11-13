var model = require("./sellout_model.js");

model.storeItemFromTransaction({
        customer: 2345678,
        vendor: "Tesco",
        itemName: "Milk",
        cost: 55
});

model.storeItemFromTransaction({
        customer: 234568,
        vendor: "Tesco",
        itemName: "Milk",
        cost: 55
});

model.storeItemFromTransaction({
        customer: 2345678,
        vendor: "Tesco",
        itemName: "Watah",
        cost: 55
});

model.storeItemFromTransaction({
        customer: 2345678,
        vendor: "Tesco",
        itemName: "Watah",
        cost: 55
});


model.getVendorCustomerData("Tesco", function(err, results) {
    console.log(JSON.stringify(results));
});
