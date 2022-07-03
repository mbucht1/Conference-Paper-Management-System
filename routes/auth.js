const express = require('express');
const authController = require('../controller/auth');
const router = express.Router();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        //temporary
        cb(null, "C:/Users/MichaelB/Desktop/cpms" + "/papers")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({storage: fileStorageEngine});



//send data from server to database
//whenever route get an specified url, it calls function in auth.js in controller folder
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotpassword);
router.post('/authorRegistration', authController.authorRegistration);
router.post('/reviewerRegistration', authController.reviewerRegistration);
router.post('/paperSubmit', upload.single("file"), authController.paperSubmit);
router.post('/paperReview', authController.paperReview);
router.post('/authorAccount', authController.authorAccount);
router.post('/reportPage', authController.reportPage);
router.post('/reviewerAccount', authController.reviewerAccount);
module.exports = router;
