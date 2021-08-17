const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'portfolio',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lecture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'lecture',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'portfolio',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_Portfolio_Lecture1',
          using: 'BTREE',
          fields: [{ name: 'lecture_id' }],
        },
        {
          name: 'fk_Portfolio_User1',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    },
  );
};
