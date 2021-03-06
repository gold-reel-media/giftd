const db = require("../models");

module.exports = function (app) { 

    //get user object by passing it object containing username (user's email)
    app.get("/api/getUser/:username", (req, res) => {
        // console.log(req.params.username);
        db.User.findOne({ where: {username: req.params.username}})
            .then(user => res.status(200).json(user));
      });

    //get wishlist object by passing it object containing wishlistid
    app.get("/api/getWishlist/:wishlistid", (req, res) => {
        db.Wishlist.find({ where: {wishlistId: req.params.wishlistid}})
            .then(wishlist => res.status(200).json(wishlist));
      });

    //get item object by passing it object containing itemid
    app.get("/api/getItem/:itemid", (req, res) => {
        db.Item.find({ where: {itemId: req.params.itemid}})
            .then(item => res.status(200).json(item));
      });
    //get user's wishlists provided object containing username
    app.get("/api/getWishlists/:username", (req, res) => {
        db.User.findOne({ where: {username: req.params.username}})
            .then(user => user.getWishlists().then(wishlist => res.status(200).json(wishlist)))
            //.then(user => console.log("user obj: " + user));
      });

    //get wishlist's items provided object containing wishlistid
    app.get("/api/getItems/:wishlistId", (req, res) => {
        db.Wishlist.find({ where: {wishlistId: req.params.wishlistId} })
            .then(wishlist => wishlist.getItems().then(items => res.status(200).json(items)))
    });

    //get user's friendslist provided object containing username
    app.get("/api/getFriends/:username", (req, res) => {
        db.User.findOne({ where: {username: req.params.username} })
            .then(
                 friends => {friends.getFriend2().then(friend => {res.status(200).json(friend)});}
            )
    });
    
    //create a user, passing it object with info for new user
    app.post("/api/newUser", (req, res) => {
        db.User.create({
            username: req.body.username,
            profilename: req.body.profilename
        }).then( dbUser => {
            res.status(200).json(dbUser);
          });
    });

    //create a wishlist and associate it to user
    //passing it wishlist object containing new info and user object of user it will belong to
    app.post("/api/newWishlist", (req, res) => {
        db.Wishlist.create({  name: req.body.name }).then(wishlist => {
            db.User.find({where: {username: req.body.username }}).then(user => {
                user.addWishlists([wishlist]);
                res.status(200).json(wishlist);
            });
        });
    });

    //create an item and add it to a wishlist, passing it object full or info to be added
    //as well as wishlist object of wishlist it is being added to
    app.post("/api/newItem", (req, res) => {
        db.Item.create({ 
            name: req.body.name,
            imageLink: req.body.imageLink,
            itemLink: req.body.itemLink,
            description: req.body.description,
            price: req.body.price,
            status: "false"
        }).then(item => {
            db.Wishlist.find({where: {wishlistId: req.body.wishlistId}} )
                .then(wishlist => {
                    wishlist.addItems([item]);
                    res.status(200).json(item);
                });
        });
    });
    
    app.delete("/api/removeItem/:id", (req, res) => {
        db.Item.destroy({ where: { itemId: req.params.id } }).then(res.sendStatus(200))
    });
    
    app.delete("/api/removeWishlist/:id", (req, res) => {
        db.Wishlist.destroy({ where: { wishlistId: req.params.id } }).then(res.sendStatus(200))
    });

    //add two users as friends, passing two usernames
    app.post("/api/addFriends", (req, res) => {
        db.User.find({ where: { username: req.body.friend1 } }).then(friend1 => {
            db.User.find({ where: { username: req.body.friend2 } }).then(friend2 => {
                friend1.addFriend2([friend2]);
                friend2.addFriend2([friend1]);
                res.sendStatus(200);
            });
        });
    });

    //remove two users as friends provided two usernames
    app.post("/api/removeFriends", (req, res) => {
        db.User.find({ where: { username: req.body.friend1 } }).then(friend1 => {
            db.User.find({ where: { username: req.body.friend2 } }).then(friend2 => {
                friend1.removeFriend2([friend2]);
                friend2.removeFriend2([friend1]);
                res.sendStatus(200);
            });
        });
    });

    //update an item to be reserved by a user, passing it item object and user object of user reserving it
    app.post("/api/changeItemStatus", (req, res) => {
        db.Item.find({where: {itemid: req.body.itemid}}).then(item => {
            var newStatus = !item.status;       //get item's current status and changes it to newStatus (opposite of current status)
            // var user = null;
            // if(newStatus){user = req.body.username}  //if item's new status is true (as in it's now reserved) user field in item is updated to userid of user who reserved it
            item.update({status: newStatus}).then(res.sendStatus(200)); //otherwise, user is null because it not reserved by anyone
        })
    })
};
