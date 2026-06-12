module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Component', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: false },
    manufacturer: { type: DataTypes.STRING(100) },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT },
    specifications: { type: DataTypes.JSON },
    image_url: { type: DataTypes.STRING(500), allowNull: true },
    image_alt: { type: DataTypes.STRING(255), allowNull: true },
    in_stock: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: 'components',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};
