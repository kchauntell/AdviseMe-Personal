'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [3, 150]
      }
    },
    note: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    noteBookId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    hidden: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'noteBookId' });
    Note.hasMany(models.Advice, { foreignKey: 'notesId', onDelete: 'CASCADE', hooks: true })
  };
  return Note;
};
