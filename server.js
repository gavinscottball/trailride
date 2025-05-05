// server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
// Load environment variables
require('dotenv').config();

// Load models
require('./models/User');
require('./models/Trail');
require('./models/Comment');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(__dirname, 'public/uploads')),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name =
        file.fieldname + '-' + Date.now() + ext;
      cb(null, name);
    }
  })
});

// Passport config & auth router
const authRoutes = require('./routes/auth')(passport);

const app = express();
// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// Connect to MongoDB using the environment variable if available
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trailride';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Flash messages
app.use(flash());

// Global variables for templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/trails', require('./routes/trails'));

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));