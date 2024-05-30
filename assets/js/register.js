const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY';

app.post('/register', (req, res) => {
    const { name, email, 'g-recaptcha-response': recaptchaResponse } = req.body;

    // Verify reCAPTCHA
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaResponse}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If reCAPTCHA verification is successful, proceed with user registration
            console.log('reCAPTCHA verification successful');
            console.log('Name:', name);
            console.log('Email:', email);
            res.send('Registration successful');
        } else {
            // If reCAPTCHA verification fails, show an error message
            console.log('reCAPTCHA verification failed');
            res.status(403).send('reCAPTCHA verification failed');
        }
    })
    .catch(error => {
        console.error('Error during reCAPTCHA verification:', error);
        res.status(500).send('Error during reCAPTCHA verification');
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
