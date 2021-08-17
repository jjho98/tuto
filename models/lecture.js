const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'lecture',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      embed: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      duration: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      tutorial_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'tutorial',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'lecture',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_Lecture_Tutorial1',
          using: 'BTREE',
          fields: [{ name: 'tutorial_id' }],
        },
      ],
    },
  );
};
