const express = require('express');
const router = express.Router();
const { addCollaborator, getCollaborators} = require('../controllers/collaboratorController');

router.route('/collaborate').post(addCollaborator);
router.route('/collaborators').post(getCollaborators);
module.exports = router;