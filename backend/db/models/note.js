'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    note: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    noteBookId: DataTypes.INTEGER,
    hidden: DataTypes.BOOLEAN
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};