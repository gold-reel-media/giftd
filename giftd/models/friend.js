module.exports = function(sequelize, Sequelize) {
    var Friend = sequelize.define("Friend", {
      friend1: Sequelize.INTEGER,
      friend2: Sequelize.INTEGER,
    }); 
  
    return Friend;
  };
  