module.exports = function(sequelize, Sequelize) {
    var Wishlist = sequelize.define("Wishlist", {
      wishlistId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING
    }); 
  
    return Wishlist;
  };
  