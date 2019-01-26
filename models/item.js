module.exports = function(sequelize, Sequelize) {
    var Item = sequelize.define("Item", {
      itemId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      itemLink: Sequelize.STRING,
      imageLink: Sequelize.STRING,
      description: Sequelize.STRING,
      price: Sequelize.FLOAT,
      status: Sequelize.BOOLEAN,
      user: Sequelize.STRING
    }); 
  
    return Item;
  };
  