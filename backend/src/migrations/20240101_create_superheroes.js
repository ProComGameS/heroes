const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('Superheroes', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nickname: { type: DataTypes.STRING, allowNull: false },
            real_name: { type: DataTypes.STRING, allowNull: false },
            origin_description: { type: DataTypes.TEXT },
            superpowers: { type: DataTypes.TEXT },
            catch_phrase: { type: DataTypes.TEXT },
            images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false }
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('Superheroes');
    }
};