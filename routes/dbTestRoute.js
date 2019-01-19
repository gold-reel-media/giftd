const db = require("../models");

module.exports = function (app) {
    //creates 2 users (Bob, and Larry) and one item (testitem), all details of users and item hardcoded in
    app.post("/dbtest", (req, res) => {
        db.User.create({
            username: "Bob"
        }).then( dbUser => {
            res.json(dbUser);
          });
        db.User.create({
            username: "Larry"
        }).then(dbUser => {
            res.json(dbUser);
          });
        db.Item.create({
            name: "testitem",
            link: "example.com/image",
            price: 10,
            status: "false"
        }).then(dbItem => {
            res.json(dbItem);
          });
    });

    //adds Bob and Larry as friends, bob and Larry hard coded in
    app.post("/dbrelate", (req, res) => {
        db.User.find({ where: { username: 'Bob' } }).then(friend1 => {
            db.User.find({ where: { username: "Larry" } }).then(friend2 => {
                friend1.addFriend2([friend2]);
                friend2.addFriend2([friend1]);
            });
        });
    });

    //adds item with id 1 to wishlist with id of 1
    app.post("/addItem", (req, res) => {
        db.Item.find({ where: { itemId: 1 } }).then(item => {
            db.Wishlist.find({ where: { wishlistId: 1 } }).then(wishlist => {
                wishlist.addItems([item]);
            });
        });
    });

    //relates wishlist named testwishlist to user name Larry
    app.post("/relatewish", (req, res) => {
        db.Wishlist.create({  name: "testwishlist"}).then(wishlist => {
            db.User.find({where: {username: "Larry"}}).then(user => {
                user.addWishlists([wishlist]);
            })
        });
    })

    //gets friends list of username entered
    app.get("/friends/:user", (req, res) => {
        db.User.find({ where: {username: req.params.user} }).then( friends => friends.getFriend2().then(friend => res.json(friend)))
    });

    //gets items for wishlist name entered
    app.get("/wishlist/:wish", (req, res) => {
        db.Wishlist.find({ where: {name: req.params.wish} }).then( wishlist => wishlist.getItems().then(items => res.json(items)))
    });

    //gets wishlist for username entered
    app.get("/user/:user", (req, res) => {
        db.User.find({ where: {username: req.params.user}}).then(user => user.getWishlists().then(wlist => res.json(wlist)));
    })
};
