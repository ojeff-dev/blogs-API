module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'categories',
  });

  return Category;
};
