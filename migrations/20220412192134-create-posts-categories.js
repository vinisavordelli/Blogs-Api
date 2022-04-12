module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'PostsCategories',
      {
        postId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'BlogPosts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        categoryId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'Categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        timestamp: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  },
};