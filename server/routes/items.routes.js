const express = require("express");
const router = express.Router();
const passport = require("passport");
const itemModels = require('../models/items.models');

// Add Item
router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
    // check for valid info
    if(!req.body.name || !req.body.qty || !req.body.price){
        return res.send({success: false, msg: "Invalid values provided"})
    }

    // pass it to the model
    itemModels.addItem(res, req.user.id, req.body.name, req.body.qty, req.body.price);

})

// Delete Item
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    itemModels.removeItem(res, req.user.id, req.params.id);
})

// Get Items by User
router.get("/user", passport.authenticate('jwt', {session: false}), (req, res) => {
    itemModels.itemsByUser(res, req.user.id);
})

module.exports = router;