const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'taken',
    {
      tutorial_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tutorial',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'taken',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'tutorial_id' }, { name: 'user_id' }],
        },
        {
          name: 'fk_Tutorial_has_User_User2',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    },
  );
};
