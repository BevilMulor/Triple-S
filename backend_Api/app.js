var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose= require('mongoose');
const multer = require("multer");//for image file uploads

//commit for committing sake
const upload = multer({ dest: 'uploads/' });  // Customize destination as needed



//setting up cors
// The cors middleware in Express allows your backend to accept requests from different origins
//  (like your frontend running on a different port). 
//  However, the way you configure it affects who can access your backend.
var app = express();

const cors = require("cors");  //allows all origins. simple but dangerous
// app.use(cors()); // Enable CORS for all requests

// Allow CORS for all routes (General Configuration)
// app.use(
//   cors({
//     origin: "*", // Allow all origins for public endpoints
//     methods: "GET, POST, PUT, DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow JWT headers
//   })
// );

//for the sake of vercel amd custom servers
//CORS Setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, authorization headers, etc.)
})


//MEDIA

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath, stat) => {
    const extname = path.extname(filePath).toLowerCase();
    if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
      res.set('Content-Disposition', 'inline');
      res.set('Content-Type', 'image/jpeg');  // Set appropriate MIME type
    }
  }
}));
// app.post('/media/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: 'No file uploaded' });
//   }

//   const uploaderId = req.body.uploaderId;  // Access uploader's ID
//   const uploaderRole = req.body.uploaderRole;  // Access uploader's role

//   console.log('Uploader Info:', uploaderId, uploaderRole);

//   // Simulate file processing and save the file info
//   const fileUrl = `/uploads/${req.file.filename}`;

//   // Send back a response with the file URL
//   res.status(200).json({ fileUrl });
// });



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('../routes/auth');
var talentRouter = require('../routes/talent');
var coachRouter = require('./routes/coach');
var scoutRouter = require('./routes/scouts');
var mediaRouter = require('./routes/media');
var adminRouter = require('./routes/admin');



mongoose.connect('mongodb+srv://bmulor:zdW0MvDIPKrtQAk4@cluster0.bjrur.mongodb.net/')
 .then(()=>{console.log('Connected to the database')})
 .catch((error)=>{ console.log(error)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// pass: zdW0MvDIPKrtQAk4
// username: bmulor

//URI: mongodb+srv://bmulor:zdW0MvDIPKrtQAk4@cluster0.bjrur.mongodb.net/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/talent',talentRouter);
app.use('/coach',coachRouter);
app.use('/scout', scoutRouter);
app.use('/media', mediaRouter);
app.use('/admin',adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
