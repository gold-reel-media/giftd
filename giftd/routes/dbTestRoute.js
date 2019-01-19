const db = require("../models");

module.exports = function (app) {
    app.post("/dbtest", (req, res) => {
        db.User.create({
            username: "Bob"
        }).then(console.log("user added to db"));
        db.User.create({
            username: "Larry"
        }).then(console.log("user added to db"));
        db.Wishlist.create({
            name: "testwishlist",
            userId: 1
        }).then(console.log("wishlist added to db"));
        db.Item.create({
            name: "testitem",
            link: "example.com/image",
            price: 10,
            status: "false"
        }).then(console.log("item added to db"));
        //creates relation between item and wishlist in wishitem table
        db.Item.find({ where: { name: 'testitem' } }).then(item => {
            db.Wishlist.find({ where: { wishlistId: 1 } }).then(wishlist => {
                item.addWishlists([wishlist]);
            });
        });
        db.User.find({ where: { username: 'Bob' } }).then(friend1 => {
            db.User.find({ where: { username: "Larry" } }).then(friend2 => {
                friend1.addFirsts([friend2]);
            });
        });
    });

};
