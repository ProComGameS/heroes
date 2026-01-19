const Superhero = require('../models/Superhero');


const DEFAULT_LIMIT = 5;


const getHeroData = (body) => ({
    nickname: body.nickname,
    real_name: body.real_name,
    origin_description: body.origin_description,
    superpowers: body.superpowers,
    catch_phrase: body.catch_phrase
});

exports.getAllHeroes = async (req, res) => {
    try {
        const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
        const limit = DEFAULT_LIMIT;

        const { count, rows } = await Superhero.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            distinct: true
        });

        return res.json({
            total: count,
            heroes: rows
        });

    } catch (error) {

        console.error('Error in getAllHeroes:', error);
        return res.status(500).json({ error: 'Internal server error while fetching heroes.' });
    }
};

    exports.getHeroById = async (req, res) => {
    try {
        const hero = await Superhero.findByPk(req.params.id);
        if (!hero) {
            return res.status(404).json({ error: 'Hero not found' });
        }
        return res.json(hero);

    } catch (error) {

        console.error('Error in getHeroById:', error);
        return res.status(500).json({ error: 'Internal server error while fetching hero details.' });
    }
};

exports.createHero = async (req, res) => {
    try {

        const imageFiles = req.files ? req.files.map(file => file.filename) : [];


        const heroData = {
            ...getHeroData(req.body),
            images: imageFiles
        };

        const hero = await Superhero.create(heroData);
        return res.status(201).json(hero);
    } catch (error) {
        console.error('Error in createHero:', error);
        return res.status(500).json({ error: error.message || 'Failed to create hero.' });
    }
    };

    exports.updateHero = async (req, res) => {
    try {
        const hero = await Superhero.findByPk(req.params.id);
        if (!hero) {
            return res.status(404).json({ error: 'Hero not found' });
        }


        const newImages = req.files ? req.files.map(file => file.filename) : [];


        let existingImages = [];
        if (req.body.existingImages) {
            try {
                existingImages = JSON.parse(req.body.existingImages);
                if (!Array.isArray(existingImages)) existingImages = [];

            } catch (e) {

                existingImages = [];
            }
        }


        const updateData = {
            ...getHeroData(req.body),
            images: [...existingImages, ...newImages]
        };

        await hero.update(updateData);
        return res.json(hero);
    } catch (error) {
        console.error('Error in updateHero:', error);
        return res.status(500).json({ error: 'Failed to update hero details.' });
    }
};

    exports.deleteHero = async (req, res) => {
    try {
        const deletedCount = await Superhero.destroy({
            where: { id: req.params.id }
        });

            if (deletedCount === 0) {
            return res.status(404).json({ error: 'Hero not found' });
            }

        return res.status(204).send();
    } catch (error) {
        console.error('Error in deleteHero:', error);
        return res.status(500).json({ error: 'Failed to delete hero.' });
    }
};