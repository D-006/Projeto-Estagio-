// Build model
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Build', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    total_price: {
      type: DataTypes.DECIMAL(12, 2),
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'builds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};
