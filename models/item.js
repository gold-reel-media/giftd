module.exports = function(sequelize, Sequelize) {
    var Item = sequelize.define("Item", {
      itemId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      link: Sequelize.STRING,
      price: Sequelize.FLOAT,
      status: Sequelize.BOOLEAN,
      user: Sequelize.INTEGER
    }); 
  
    return Item;
  };
  