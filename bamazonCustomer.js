const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "jessy",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Welcome to our Bamazon store, take a look at a list of our current products:")
        console.log(res);
        connection.end();
        start();
    });
};

function start() {
    inquirer.prompt({
            name: "buyItem",
            type: "list",
            message: "Would you like to buy an item?",
            choices: ["Yes", "No"]
        })
        .then(function (answer) {
            if (answer.buyItem === "Yes") {
                chooseItem();
            } else {
                console.log("Thank you for visiting, please come back again.")
                connection.end();
            }
        });
}

function chooseItem() {
    connection.query("SELECT * FROM auctions", function (err, results) {
            if (err) throw err;
            inquirer.promt({
                    name: "buyItem",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Please choose an item ypu would like to buy:"
                }, {
                    name: "payment",
                    type: "input",
                    message: "Please verify the price of the item you chose:"
                })
                .then(function (answer) {
                        var chocenItem;
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].price === answer.choice) {
                                chooseItem = results[1];
                            }
                        }
                        chooseItem();
                    },
                    function chooseItem() {
                        connection.query("SELECT * FROM products", function (err, res) {
                            if (err) throw err;
                        })
                    }
                )
        }
    )
}