"use strict";

module.exports = function(sequelize, DataTypes) {
  var URL = sequelize.define("URL", {
    url: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return URL;
};
