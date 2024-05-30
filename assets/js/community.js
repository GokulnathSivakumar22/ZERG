const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle discussion form submission
app.post('/start-discussion', (req, res) => {
  const { discussionTitle, discussionContent } = req.body;

  // Insert discussion data into the database
  const sql = `INSERT INTO discussions (title, content) VALUES (?, ?)`;
  const values = [discussionTitle, discussionContent];

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
