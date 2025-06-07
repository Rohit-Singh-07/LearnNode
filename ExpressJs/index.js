const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// CORS is a security feature implemented by browsers that
// prevents a webpage from making requests to a domain different from the one that served the web page.
// However, in many scenarios (like APIs or web apps), you might want to allow cross-origin requests for certain domains.
const cors = require('cors');


// Morgan is an HTTP request logger middleware for Node.js.
//  It simplifies the logging of incoming requests by providing predefined formats and customization options. 
const morgan = require('morgan')

const app = express();

const corsOptions = {
  origin: 'https://your-frontend-domain.com',  // Replace with your front-end URL
  methods: ['GET', 'POST'],  // You can specify methods allowed
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};

// Enable CORS for all routes and origins
app.use(cors());

// app.use(cors(corsOptions));



app.use(cors(corsOptions));


app.use(session({
  secret: 'your-secret-key',    // Used to sign the session ID cookie (keep it secret!)
  resave: false,                 // Don't save session if unmodified
  saveUninitialized: true,       // Save new sessions even if they haven't been modified
  cookie: { maxAge: 60000 }      // Session expires after 1 minute (60000 ms)
}));

app.use(flash());

// Example route to set flash message
app.get('/set-flash', (req, res) => {
  req.flash('info', 'This is a flash message!');
  res.redirect('/show-flash');
});

// Route to display flash message
app.get('/show-flash', (req, res) => {
  const flashMessage = req.flash('info'); // Get the flash message
  res.send(flashMessage.length ? flashMessage : 'No flash message set');
});



// Middleware is basically a function that sits between the incoming HTTP request and the final route handler

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware/route
});

// Middleware to parse JSON body automatically
app.use(express.json());

app.use(cookieParser());

app.use(morgan('dev'));

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome! Refresh to count views.');
  }
})

// POST route example
app.post('/data', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Data received', yourData: req.body });
});

app.get('/products/:category/:productId', (req, res) => {
  const category = req.params.category;
  const productId = req.params.productId;
  res.send(`Product ${productId} in category ${category}`);
});

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  // Setting a cookie named "user" with value "John Doe"
  res.cookie('user', 'John Doe', { httpOnly: true, maxAge: 3600000 }); // 1 hour
  res.send('Cookie has been set!');
});

// Route to read cookies
app.get('/get-cookie', (req, res) => {
  // Accessing the cookie value
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.send(`User cookie value: ${userCookie}`);
  } else {
    res.send('No user cookie found!');
  }
});

// Route to clear cookies
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('user');
  res.send('User cookie has been cleared!');
});


// Start server
app.listen(3000, () => {
  console.log('Express server running on http://localhost:3000');
});



