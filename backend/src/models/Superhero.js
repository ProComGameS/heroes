const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Superhero = sequelize.define('Superhero', {
    nickname: { type: DataTypes.STRING, allowNull: false },
    real_name: { type: DataTypes.STRING, allowNull: false },
    origin_description: { type: DataTypes.TEXT },
    superpowers: { type: DataTypes.TEXT },
    catch_phrase: { type: DataTypes.TEXT },
    images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },

},  {
        tableName: 'Superheroes',
    timestamps: true,
    }
    );

module.exports = Superhero;