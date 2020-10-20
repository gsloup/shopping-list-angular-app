require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");

const userRoutes = require("./server/routes/user.routes");
const itemRoutes = require("./server/routes/items.routes")

const passport = require("passport");
const passportConf = require("./server/config/passport.conf")
passportConf(passport);
app.use(passport.initialize());

app.use(express.static(__dirname+"/dist"));
app.use(bodyParser.json());

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

app.get('*', (req, res)=> {
    res.sendFile('/dist/index.html', {root: __dirname + '/'});
});

app.listen(port, () => console.log(`Shopping List app listening on port ${port}!`));