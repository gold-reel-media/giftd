module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define("User", {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING
    }); 
  
    return User;
  };
  