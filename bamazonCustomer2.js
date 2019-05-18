const mysql = require("mysql");
const inquirer = require("inquirer");
const cart = [];

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "jessy",
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
            search(answer.action)
        });
}

function search(department) {
    var query = connection.query("SELECT * FROM products WHERE department_name=?", department, function (err, res) {
        console.log("-------------------------------------------------------------------------");
        console.log("\n====== Okay! Here is our stock for that item. ======\n");
        console.table(res);
        console.log("-------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].id + " | " +
                res[i].item_id + " | " +
                res[i].product_name + " | " +
                res[i].department_name + " | $" +
                res[i].price);
        }
        // console.log(query.sql);
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
                message: "Please enter the ID Number for the product you'd like to purchase.",
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
        .then(function (answer) {
            var qty = answer.quantity;
            var ID = answer.IDNumber;
            var order = {
                qty: qty,
                ID: ID
            }
            cart.push(order);
            buyAnother();
        });
}

function buyAnother() {
    console.log("Let's look into that");
    inquirer.prompt({
            name: "buyAnother",
            type: "list",
            message: "Would you like to purchase another item?",
            choices: ["Yes", "No"],
        })
        .then(function (answer) {
            if (answer.buyAnother === "Yes") {
                console.log("Cool, let's choose your item!");
                console.log("-------------------------------------------------------------------------\n");
                offer();
            } else {
                console.log("-----------------------------------------------------------\n");
                console.log("No problem! Thank you for visiting and please come back again!")
                console.log("-----------------------------------------------------------\n");
                purchase();
            }
        });
}

function purchase() {
    console.log(cart);
    for (var i = 0; i < cart.length; i++) {
        connection.query("SELECT * FROM products WHERE id = " + cart[i].ID, function (err, res) {
            console.log("cart", cart);
            if (err) throw err;
            console.log("cart", cart);
            if (cart[i].qty <= res[0].stock_quantity) {
                var total = res[0].price * cart[i].qty;
                console.log("cart", cart);
                console.log("\n-------------------------------------------------------------------------\n");
                console.log("Great! Let me get that ready for you.\n");
                console.log("Here is your cart total. The cost for " + cart[i].qty + " " + res[0].product_name + " is $" + total);
                console.log("-------------------------------------------------------------------------\n");
                connection.query("UPDATE products SET stock_quantity = stock_quantity - " + cart[i].qty);
            } else {
                console.log("-------------------------------------------------------------------------\n");
                console.log("Sorry we're a bit short on that particular item.\nWe aren't able to complete this order at this time.");
                console.log("-------------------------------------------------------------------------\n");

            };
        });
    }
}