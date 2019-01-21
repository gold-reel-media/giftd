const db = require("../models");

module.exports = function (app) { 

    //get user object by passing it object containing username (user's email)
    app.get("/api/getUser", (req, res) => {
        console.log(req.body)
        db.User.findOne({ where: {username: req.body.username}})
            .then(user => res.status(200).json(user));
      });

    //get wishlist object by passing it object containing wishlistid
    app.get("/api/getWishlist", (req, res) => {
        db.Wishlist.find({ where: {wishlistid: req.body.wishlistid}})
            .then(wishlist => res.status(200).json(wishlist));
      });

    //get item object by passing it object containing itemid
    app.get("/api/getItem", (req, res) => {
        db.Item.find({ where: {itemid: req.body.itemid}})
            .then(item => res.status(200).json(item));
      });
    //get user's wishlists provided object containing userid
    app.get("/api/getWishlists", (req, res) => {
        db.User.find({ where: {userid: req.body.userid}})
            .then(user => user.getWishlists().then(wishlist => res.status(200).json(wishlist)))
      });

    //get wishlist's items provided object containing wishlistis
    app.get("/api/getItems", (req, res) => {
        db.Wishlist.find({ where: {wishlistid: req.body.wishlistid} })
            .then(wishlist => wishlist.getItems().then(items => res.status(200).json(items)))
    });

    //get user's friendslist provided object containing username
    app.get("/api/getFriends", (req, res) => {
        db.User.find({ where: {username: req.body.username} })
            .then(friends => friends.getFriend2().then(friend => res.status(200).json(friend)))
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
        db.Wishlist.create({  name: req.body.wishlist.name }).then(wishlist => {
            db.User.find({where: {userid: req.body.user.userid }}).then(user => {
                user.addWishlists([wishlist]);
                res.status(200).json(wishlist);
            });
        });
    });

    //create an item and add it to a wishlist, passing it object full or info to be added
    //as well as wishlist object of wishlist it is being added to
    app.post("/api/newItem", (req, res) => {
        db.Item.create({ 
            name: req.body.item.name,
            link: req.body.item.link,
            price: req.body.item.price,
            status: "false"
        }).then(item => {
            db.Wishlist.find({where: {wishlistid: req.body.wishlist.wishlistid}} )
                .then(wishlist => {
                    wishlist.addItems([item]);
                    res.status(200).json(item);
                });
        });
    });

    //add two users as friends, passing two user objects
    app.post("/api/addFriends", (req, res) => {
        db.User.find({ where: { username: req.body.friend1.username } }).then(friend1 => {
            db.User.find({ where: { username: req.body.friend2.username } }).then(friend2 => {
                friend1.addFriend2([friend2]);
                friend2.addFriend2([friend1]);
                res.status(200);
            });
        });
    });

    //update an item to be reserved by a user, passing it item object and user object of user reserving it
    app.post("/api/changeItemStatus", (req, res) => {
        db.Item.find({where: {itemid: req.body.item.itemid}}).then(item => {
            var newStatus = !item.status;       //get item's current status and changes it to newStatus (opposite of current status)
            var user = null;
            if(newStatus){user = req.body.user.userid}  //if item's new status is true (as in it's now reserved) user field in item is updated to userid of user who reserved it
            item.update({status: newStatus, user: user}).then(res.status(200)); //otherwise, user is null because it not reserved by anyone
        })
    })
};