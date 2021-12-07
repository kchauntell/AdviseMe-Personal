'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adive = sequelize.define('Adive', {
    advice: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    notedId: DataTypes.INTEGER
  }, {});
  Adive.associate = function(models) {
    // associations can be defined here
  };
  return Adive;
};