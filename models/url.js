// "use strict";

// module.exports = function(sequelize, DataTypes) {
//   var URL = sequelize.define("URL", {
//     url: DataTypes.STRING,
//     hash: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });

//   return URL;
// };

// testing below: 

"use strict";

module.exports = function(sequelize, DataTypes) {
  var URL = sequelize.define("URL", {
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: "Must be a URL" }
      }
    },
    hash: DataTypes.STRING
  }, 
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return URL;
};
