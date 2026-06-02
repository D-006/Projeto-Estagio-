const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = require('./User')(sequelize, DataTypes);
const Build = require('./Build')(sequelize, DataTypes);
const Component = require('./Component')(sequelize, DataTypes);
const RefreshToken = require('./RefreshToken')(sequelize, DataTypes);

// Relações
User.hasMany(Build, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Build.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(RefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

Build.belongsToMany(Component, { through: 'build_components', foreignKey: 'build_id' });
Component.belongsToMany(Build, { through: 'build_components', foreignKey: 'component_id' });

module.exports = { sequelize, User, Build, Component, RefreshToken };
