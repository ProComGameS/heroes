const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./src/config/database');
const heroRoutes = require('./src/api/hero_routes');
const { Umzug, SequelizeStorage } = require('umzug');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));


const MigrationUmzug = new Umzug({
    migrations: { glob: path.join(__dirname, './src/migrations/*.js') },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

    const seedUmzug = new Umzug({
        migrations: { glob: path.join(__dirname, './src/seeders/*.js') },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeDataSeeds' }),
        logger: console,
    }   );

app.use('/api/heroes', heroRoutes);

const start = async () => {
    try {
        await sequelize.authenticate();
        await MigrationUmzug.up(); // Runs migrations
        await seedUmzug.up();
        app.listen(3000, () => console.log('Server running on port 3000'));
    } catch (e) {
        console.error(e);
    }
};

start();