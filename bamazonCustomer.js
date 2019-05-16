const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as itemRequested " + connection.threaditemRequested);
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n\n");
        console.log("          Welcome to the Bamazon Outdoor Gear Comapny\n          Where you'll find all the gear you need to experience the great oudoors")
        console.log("\n-------------------------------------------------------------------------");
        console.log("-------------------------------------------------------------------------\n");
        // console.log(res);
        // connection.end();
        start(res);
    });
};

function start(res) {
    // console.log(res)
    inquirer.prompt({
            name: "buyItem",
            type: "list",
            message: "Would you like to purchase camping gear?",
            choices: ["Yes", "No"],
        })
        .then(function (answer) {
            if (answer.buyItem === "Yes") {
                // console.log("Cool, let's choose your item!")
                console.log("-------------------------------------------------------------------------\n");
                offer();
            } else {
                console.log("-------------------------------------------------------------------------\n");
                console.log("Thank you for visiting, please come back again!")
                console.log("-------------------------------------------------------------------------\n");
                connection.end();
            }
        });
}

function offer() {
    // console.log(res)
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What type of gear are you looking for?",
            choices: [
                "Outdoor Backpacks",
                "Sleeping Bags",
                "Camping Tents",
                "Camping Chairs",
                "I'll come back later!"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Outdoor Backpacks":
                    backpackSearch();
                    break;
                case "Sleeping Bags":
                    sleepingBagSearch();
                    break;
                case "Camping Tents":
                    tentsSearch();
                    break;
                case "Camping Chairs":
                    chairsSearch();
                    break;
                case "I'll come back later!":
                    console.log("\n-------------------------------------------------------------------------\n");
                    console.log("Thank you for visiting, please come back again!")
                    console.log("-------------------------------------------------------------------------\n");
                    connection.end();
                    break;
            }
        });
}

function backpackSearch() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Outdoor Backpacks"], function (err, res) {
        console.log("-------------------------------------------------------------------------");
        console.log("\n====== Okay! Here is our stock for that item. ======\n");
        console.log("ID " + " | " + " Item ID " + " | " + " Product Name " + " | " + " Department " + " | " + " Price ($) ")
        console.log("-------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].id + " | " +
                res[i].item_id + " | " +
                res[i].product_name + " | " +
                res[i].department_name + " | " +
                res[i].price);
        }
        console.log(query.sql);
        console.log("-------------------------------------------------------------------------\n");
        buyItem();
    });
}

function sleepingBagSearch() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Sleeping Bags"], function (err, res) {
        console.log("-------------------------------------------------------------------------\n");
        console.log("====== Okay! Here is our stock for that item. ======\n");
        console.log("ID " + " | " + " Item ID " + " | " + " Product Name " + " | " + " Department " + " | " + " Price ($) ")
        console.log("-------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].id + " | " +
                res[i].item_id + " | " +
                res[i].product_name + " | " +
                res[i].department_name + " | " +
                res[i].price);
        }
        console.log(query.sql);
        console.log("-------------------------------------------------------------------------\n");
        buyItem();
    });
}

function tentsSearch() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Camping Tents"], function (err, res) {
        console.log("-------------------------------------------------------------------------\n");
        console.log("====== Okay! Here is our stock for that item ======\n");
        console.log("ID " + " | " + " Item ID " + " | " + " Product Name " + " | " + " Department " + " | " + " Price ($) ");
        console.log("-------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].id + " | " +
                res[i].item_id + " | " +
                res[i].product_name + " | " +
                res[i].department_name + " | " +
                res[i].price);
        }
        console.log(query.sql);
        console.log("-------------------------------------------------------------------------\n");
        buyItem();
    });
}

function chairsSearch() {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", ["Camping Chairs"], function (err, res) {
        console.log("-------------------------------------------------------------------------\n");
        console.log("====== Okay! Here is our stock for that item. ======\n");
        console.log("ID " + " | " + " Item ID " + " | " + " Product Name " + " | " + " Department " + " | " + " Price ($) ")
        console.log("-------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].id + " | " +
                res[i].item_id + " | " +
                res[i].product_name + " | " +
                res[i].department_name + " | " +
                res[i].price);
        }
        console.log(query.sql);
        console.log("-------------------------------------------------------------------------\n");
        buyItem();
    });
}

function buyItem() {
    // console.log(res)
    inquirer
        .prompt([{
                name: "IDNumber",
                type: "input",
                message: "Please enter the ID Number for the product you'd like to purhcase.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items do you wish to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (response) {
            var itemsquantity = response.quantity;
            var itemsID = response.IDNumber;
            purchase(itemsID, itemsquantity);
        });
}

function purchase(IDNumber, itemsWanted) {
    connection.query('SELECT * FROM products WHERE id = ' + IDNumber, function (err, res) {
        if (err) throw err;
        if (itemsWanted <= res[0].stock_quantity) {
            var grandTotal = res[0].price * itemsWanted;
            console.log("\n-------------------------------------------------------------------------\n");
            console.log("Great! Let me get that ready for you.\n");
            console.log("Here is your cart total. The cost for " + itemsWanted + " " + res[0].product_name + " is $ " + grandTotal);
            console.log("-------------------------------------------------------------------------\n");
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + itemsWanted + "WHERE item_Requested = " + IDNumber);
            another();
        } else {
            console.log("-------------------------------------------------------------------------\n");
            console.log("Sorry we're a bit short on that particular item.\nWe aren't able to complete this order at this time.");
            console.log("-------------------------------------------------------------------------\n");
        };
    });
}

function another() {
    console.log("Let's look into that");
    inquirer.prompt({
            name: "buyAnother",
            type: "list",
            message: "Would you like to purchase another item?",
            choices: ["Yes", "No"],
        })
        .then(function (answer) {
            if (answer.buyAnotherItem === "Yes") {
                console.log("Cool, let's choose your item!");
                console.log("-------------------------------------------------------------------------\n");
                // offer();
            } else {
                console.log("-----------------------------------------------------------\n");
                console.log("Thank you for visiting, please come back again!")
                console.log("-----------------------------------------------------------\n");
                connection.end();
            }
        });
}
