const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");

const app = express();

let viewAll = 0;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var chunks = [];
    const url = process.env.ENDPOINT;
    http.get(url, function (response) {
        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {
            var data = Buffer.concat(chunks);
            var schema = JSON.parse(data);
            if (response.statusCode !== 200) {
                res.send("Non ho trovato nulla!");
            } else if (viewAll === 0) {
                res.render("home", {
                    schemaJS: schema, lunghezzaJSON: 8
                }) } else {
                    res.render("home", {
                        schemaJS: schema, lunghezzaJSON: schema.length
                    });
                    viewAll = 0;
                }
            })
        })
    });

    app.post("/all", function(req, res) {
        viewAll = 1;
        res.redirect("/");
    })

app.post("/search", function (req, res) {
    res.redirect("/products/" + req.body.search);
})

app.get("/products/:nomeProdotto", function (req, res) {
    var chunks = [];
    const url = process.env.ENDPOINT_Q + req.params.nomeProdotto;
    http.get(url, function (response) {
        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {
            var data = Buffer.concat(chunks);
            var schema = JSON.parse(data);
            if (response.statusCode !== 200) {
                res.send("Non ho trovato nulla!");
            } else {
                if (schema.length > 0) {
                    res.render("products", {
                        schemaJS: schema,
                        nomeSearch: req.params.nomeProdotto
                    });
                } else {
                    res.render("notfound");
                }

            }
        })
    })
});

app.listen(process.env.PORT || 3000, function () {
    console.log("In ascolto.");
})