// Objetos criados devido ao limite de linhas

const blogPostAssociation = {
  as: 'posts',
  through: 'PostsCategories',
  foreignKey: 'categoryId',
  otherKey: 'postId',
};

const categoryAssociation = {
  as: 'categories',
  through: 'PostsCategories',
  foreignKey: 'postId',
  otherKey: 'categoryId',
};

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'BlogPosts', key: 'id' } },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'Categories', key: 'id' },
    },
  },
    { tableName: 'PostsCategories', timestamps: false });
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, blogPostAssociation);
    models.Category.belongsToMany(models.BlogPost, categoryAssociation);
  };
  return PostCategory;
};