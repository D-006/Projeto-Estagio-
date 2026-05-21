const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = require('../db');

const db = {};

// Import all models
const files = fs.readdirSync(__dirname).filter(
  (file) => file.endsWith('.js') && file !== 'index.js'
);

files.forEach((file) => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

// Define associations
if (db.User && db.Build) {
  db.User.hasMany(db.Build, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  db.Build.belongsTo(db.User, { foreignKey: 'user_id' });
}

if (db.ComponentCategory && db.Component) {
  db.ComponentCategory.hasMany(db.Component, { foreignKey: 'category_id' });
  db.Component.belongsTo(db.ComponentCategory, { foreignKey: 'category_id' });
}

if (db.Build && db.Component) {
  db.Build.belongsToMany(db.Component, {
    through: 'build_components',
    foreignKey: 'build_id',
    otherKey: 'component_id',
  });
  db.Component.belongsToMany(db.Build, {
    through: 'build_components',
    foreignKey: 'component_id',
    otherKey: 'build_id',
  });
}

if (db.User && db.Build) {
  db.User.belongsToMany(db.Build, {
    through: 'saved_builds',
    foreignKey: 'user_id',
    otherKey: 'build_id',
    as: 'SavedBuilds',
  });
  db.Build.belongsToMany(db.User, {
    through: 'saved_builds',
    foreignKey: 'build_id',
    otherKey: 'user_id',
    as: 'SavedByUsers',
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
