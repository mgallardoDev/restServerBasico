const { Router } = require('express');
const { SearchController } = require('../controllers')

const router = Router();

router.get("/:collection/:term", SearchController.search)

module.exports = router;