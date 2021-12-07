'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    hidden: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
  };
  return Notebook;
};