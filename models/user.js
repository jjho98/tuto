const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: 'email_UNIQUE',
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: 'nickname_UNIQUE',
      },
      thumbnail: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      recommendation: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'user',
      timestamps: true,
      chartset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'email_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }],
        },
        {
          name: 'nickname_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'nickname' }],
        },
      ],
    },
  );
};
