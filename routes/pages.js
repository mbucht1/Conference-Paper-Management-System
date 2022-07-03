const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const app = express();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/Users/MichaelB/Desktop/cpms" + "/papers")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + " -- " + file.originalname)
    },
});
const upload = multer({storage: fileStorageEngine});

//Parse URL-encoded bodies (as sent ny HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies (as sent by API client)
app.use(express.json());



const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

//get methods which returns response to user

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/register', (req, res)=>{
    res.render('register');
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/auth/forgotpassword', (req, res)=>{
    res.render('forgotpassword');
       
});

router.get('/admin', (req, res)=>{
    res.render('admin');
});


router.get('/bridge', (req, res)=>{
    res.render('bridge');
});

router.get('/authorRegistration', (req, res)=>{
    res.render('authorRegistration');
});

router.get('/reviewerRegistration', (req, res)=>{
    res.render('reviewerRegistration');
});

router.get('/paperReview', (req, res)=>{
    res.render('paperReview');
});

router.get('/paperSubmit', (req, res)=>{
    res.render('paperSubmit');
});

router.get('/authorAccount', (req, res)=>{
    res.render('authorAccount');
});

router.get('/reviewerAccount', (req, res)=>{
    res.render('reviewerAccount');
});

router.get('/authorBridge', (req, res)=>{
    res.render('authorBridge');
});

router.get('/reviewerBridge', (req, res)=>{
    res.render('reviewerBridge');
});

// return res.render('authorRegistration', {
//     message: 'Author registered.'
// });
router.get('/reportPage', (req, res)=>{
    db.query('SELECT PaperID, AuthorID, FirstName, MiddleInitial, LastName, FilenameOriginal, Filename, Title, Certification, NotesToReviewers FROM paper ', (error, results) =>{
        if(error){
            throw error;
        }
        else{
            res.render('reportPage', {
                results: results
            });
        }
    });
});


// get data from database to render to the admin
router.get('/authorReport', (req, res)=>{

    db.query('SELECT * FROM author', (error, results)=>{
        if(error){
            throw error;
        }
        else{
            res.render('authorReport', {results});
        }
    });
});

router.get('/reviewerReport', (req, res)=>{

    db.query('SELECT * FROM reviewer', (error, results)=>{
        if(error){
            throw error;
        }
        else{
            res.render('reviewerReport', {results});
        }
    });
});



router.get('/reviewSummaryReport', (req, res)=>{

    db.query('SELECT * FROM review', (error, results) =>{
        if(error){
            throw error;
        }
        else{
            res.render('reviewSummaryReport', {results});
        }
    });
});

router.get('/reviewersCommentReport', (req, res)=>{

 
    const commentReportQuery = 'SELECT reviewer.LastName, reviewer.FirstName, reviewer.MiddleInitial, reviewer.EmailAddress, paper.Title, paper.FileName,\
    review.WrittenDocumentComments, review.ContentComments, review.PotentialForOralPresentationComments, review.OverallRatingComments FROM paper JOIN review ON\
    review.PaperID = paper.PaperID JOIN reviewer ON review.ReviewerID = reviewer.ReviewerID';
    
    db.query(commentReportQuery, (error, results)=>{

        if(error){
            throw error;
        }
        else{
            res.render('reviewersCommentReport', {results});
        }
    });
});





module.exports = router;
