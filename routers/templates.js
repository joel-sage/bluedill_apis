const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadTemplate, getTemplates, getTemplate } = require('../controllers/templateController');

// Set up the storage for uploaded files 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/templates/');
    },

    filename: function (req, file, cb) {
        const fileAddons = ['TF', 'SN']
        const pre = 'TF';
        const suf = 'SN'; 
        // File validation Comming soon;
        cb(null, `${pre}-${Date.now()}-${suf}.${file.mimetype.split('/')[1]}`);
    },
});

// Creating an instance of the multer;
const upload = multer({ storage: storage });

router.route('/upload').post(upload.single('image'), uploadTemplate);
router.route('/uploads').get(getTemplates)
router.route('/template/:id').get(getTemplate)
module.exports = router;  