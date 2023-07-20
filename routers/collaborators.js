const express = require('express');
const router = express.Router();
const { addCollaborator, getCollaborators} = require('../controllers/collaboratorController');
const { jwtVerification } = require("../middleware/authUserVerification.js");

router.route('/collaborate').post(jwtVerification,addCollaborator);
router.route('/collaborators').post(jwtVerification,getCollaborators);
module.exports = router;