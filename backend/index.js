const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const heroRoutes = require('./src/api/hero.routes');
const { Umzug, SequelizeStorage } = require('umzug');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));


const umzug = new Umzug({
    migrations: { glob: 'src/migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

app.use('/api/heroes', heroRoutes);

const start = async () => {
    try {
        await sequelize.authenticate();
        await umzug.up(); // Runs migrations
        app.listen(3000, () => console.log('Server running on port 3000'));
    } catch (e) {
        console.error(e);
    }
};

start();