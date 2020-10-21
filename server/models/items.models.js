const pool = require("../config/mysql.conf");

// Add item
function addItem(res, userId, name, qty, price){
    // try to add item
    pool.query("INSERT INTO items (userId, name, qty, price) VALUE (?,?,?,?)", [userId, name, qty, price], (err)=>{
        // send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Item successfully added' });
    })
}

// Remove item
function removeItem(res, userId, itemId){
    // try to remove item
    pool.query("DELETE FROM items WHERE items.userID = ? AND items.id = ?", [userId, itemId], (err)=>{
        // send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Item successfully deleted' });
    })


}

// Items by user
function itemsByUser(res, userId){
    // try to get items based off userId
    pool.query("SELECT * FROM items WHERE items.userId = ?", [userId], (err, results)=> {
        // send appropriate response
        if(err) return res.send({success: false, msg: 'Something went wrong, try again later'});
        return res.send({ success: true, msg: 'Item successfully returned', items: results });
    })
}


module.exports.addItem = addItem;
module.exports.removeItem = removeItem;
module.exports.itemsByUser = itemsByUser;