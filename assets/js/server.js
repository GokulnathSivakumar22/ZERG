const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Database@123',
  database: 'receipe_platform'
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true }
}));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper function to sanitize input
function sanitizeInput(input) {
  return input.trim().replace(/<[^>]*>?/gm, ''); // Basic sanitization
}

// Handle user registration
app.post('/register', async (req, res) => {
  const { name, surname, username, dob, sex, email, password } = req.body;

  // Sanitize inputs
  const sanitized_name = sanitizeInput(name);
  const sanitized_surname = sanitizeInput(surname);
  const sanitized_username = sanitizeInput(username);
  const sanitized_dob = sanitizeInput(dob);
  const sanitized_sex = sanitizeInput(sex);
  const sanitized_email = sanitizeInput(email);

  // Validate email
  if (!sanitizeInput(email) || !filter_var(email, FILTER_VALIDATE_EMAIL)) {
    return res.status(400).send('Invalid email address');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare SQL query using prepared statements
    const sql = 'INSERT INTO users (name, surname, username, dob, sex, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [sanitized_name, sanitized_surname, sanitized_username, sanitized_dob, sanitized_sex, sanitized_email, hashedPassword];

    // Execute query
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting user data into database: ', err);
        res.status(500).send('Server Error');
        return;
      }
      console.log('User data inserted into database');
      res.send('Registration Successful');
    });
  } catch (error) {
    console.error('Error hashing password: ', error);
    res.status(500).send('Server Error');
  }
});

// Handle discussion form submission
app.post('/start-discussion', (req, res) => {
  const { discussionTitle, discussionContent } = req.body;

  // Sanitize inputs
  const sanitizedTitle = sanitizeInput(discussionTitle);
  const sanitizedContent = sanitizeInput(discussionContent);

  // Prepare SQL query using prepared statements
  const sql = 'INSERT INTO discussions (title, content) VALUES (?, ?)';
  const values = [sanitizedTitle, sanitizedContent];

  // Execute query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting discussion data into database: ', err);
      res.status(500).send('Server Error');
      return;
    }
    console.log('Discussion data inserted into database');
    res.redirect('/');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
