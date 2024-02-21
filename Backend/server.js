// Importing required modules
const express = require('express');

// Creating an instance of Express
const app = express();
const port = 3000; // on default it is this.

// Define the /checkEmail endpoint
app.get('/checkEmail', (req, res) => {
 //will call sql db to check if it exists.
});

function isValidEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
