require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");

app.use(express.static(__dirname+"/dist"));
app.use(bodyParser.json());

app.get('*', (req, res)=> {
    res.sendFile('/dist/index.html', {root: __dirname + '/'});
});

app.listen(port, () => console.log(`Shopping List app listening on port ${port}!`));