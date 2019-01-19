const db = require("../models");

module.exports = function (app) {
    app.post("/dbtest", (req, res) => {
        db.User.create({
            username: "Bob"
        }).then(function(dbUser) {
            res.json(dbUser);
          });
        db.User.create({
            username: "Larry"
        }).then(function(dbUser) {
            res.json(dbUser);
          });
        db.Wishlist.create({
            name: "testwishlist",
            userId: 1
        }).then(function(dbWish) {
            res.json(dbWish);
          });
        db.Item.create({
            name: "testitem",
            link: "example.com/image",
            price: 10,
            status: "false"
        }).then(function(dbItem) {
            res.json(dbItem);
          });
    });

    app.post("/dbrelate", (req, res) => {
        db.Item.find({ where: { name: 'testitem' } }).then(item => {
            db.Wishlist.find({ where: { wishlistId: 1 } }).then(wishlist => {
                item.addWishlists([wishlist]);
            });
        });
        db.User.find({ where: { username: 'Bob' } }).then(friend1 => {
            db.User.find({ where: { username: "Larry" } }).then(friend2 => {
                friend1.addFriend2([friend2]);
            });
        });
    });

    // app.get("/friends/:user", (req, res) => {
    //     db.User.find( { where: {username: req.params.user}}).then(dbUser => {
    //         res.json(dbUser.getFriend2());
    //     })
    // });

    app.get("/friends/:user", (req, res) => {
        db.User.find({ where: {username: req.params.user} }).then(guy => guy.getFriend2().then(friendos => res.json(friendos)))
    });
};
