const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")

const app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.text());


require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function () {
    console.log("Friend-Finder listening on PORT: " + PORT);
});