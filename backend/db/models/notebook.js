
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,},
      validate: {
        len: [3, 150]
      },
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    hidden: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, { foreignKey: 'noteBookId', onDelete: 'CASCADE', hooks: true })
  };
  return Notebook;
};
