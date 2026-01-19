const express = require('express');
const router = express.Router();
const heroController = require('./superhero_controller');
const upload = require('../middleware/multer');


router.get('/', heroController.getAllHeroes);
router.get('/:id', heroController.getHeroById);


router.post('/', upload.array('images', 10), heroController.createHero);
router.put('/:id', upload.array('images', 10), heroController.updateHero);

router.delete('/:id', heroController.deleteHero);

module.exports = router;