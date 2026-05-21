// Component model
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Component', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING(100),
    },
    model: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
    },
    specifications: {
      type: DataTypes.JSON,
    },
    description: {
      type: DataTypes.TEXT,
    },
    power_consumption: {
      type: DataTypes.INTEGER,
    },
    compatibility_notes: {
      type: DataTypes.TEXT,
    },
    in_stock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'components',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};
