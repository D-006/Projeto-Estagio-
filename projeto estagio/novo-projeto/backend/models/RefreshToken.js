module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'RefreshToken',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      jti: { type: DataTypes.STRING(36), unique: true, allowNull: false },
      expires_at: { type: DataTypes.DATE, allowNull: false },
      revoked_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: 'refresh_sessions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );
};
