const { exec } = require('child_process');
const sequelize = require('../config/database');

(async () => {
    try {

        await sequelize.query(`DELETE FROM "SequelizeDataSeeds" WHERE name = '20240102_seed_superheroes.js';`);
            await sequelize.query(`DELETE FROM "SequelizeMeta" WHERE name = '20240101_create_superheroes.js';`);
        await sequelize.query(`DROP TABLE IF EXISTS "Superheroes" CASCADE;`);

                console.log('Reset done: Meta cleaned, Superheroes dropped');


        exec('npm run start', (err, stdout, stderr) => {
            if (err) {
                console.error('Failed to restart backend:', err);
                return;
            }
            console.log(stdout);
                console.error(stderr);
        });

    } catch (err) {
        console.error('Reset failed:', err);
    } finally {
        await sequelize.close();
    }
})();