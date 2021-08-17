const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'portfolioImage',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      uri: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      portfolio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'portfolio',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'portfolioImage',
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
          name: 'fk_Image_Portfolio1',
          using: 'BTREE',
          fields: [{ name: 'portfolio_id' }],
        },
      ],
    },
  );
};
