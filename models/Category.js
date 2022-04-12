module.exports = (sequelize, DataTypes) => {
  sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Categories',
    });
};
