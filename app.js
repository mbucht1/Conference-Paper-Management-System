const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const multer = require("multer");
//const exphbs = require('express-handlebars');

const busboy = require("connect-busboy");
const fs = require('fs');
const { dirname } = require("path");

dotenv.config({ path:'./.env'});

const app = express();

app.use(busboy());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent ny HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies (as sent by API client)
app.use(express.json());


app.use(cookieParser());
app.use(methodOverride('_mothod'));
//app.engine('hbs', exphbs( {extname: '.hbs'}));
app.set('view engine', 'hbs');


db.connect( (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySQL Connnected...")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(5002,()=> {
    console.log("Sever started on Port 5002");
})