// Importing required modules
const express = require('express');
const cors = require('cors');
const connector = require('./node-connector')

// // Creating an instance of Express
// const app = express();
// const port = 3000; // on default it is this.

// app.use(cors({
//   origin: 'http://localhost:4200',
//   methods: 'POST,GET,PUT,OPTIONS,DELETE'
// }));

// // Define the /checkEmail endpoint
// app.get('/checkEmailDB', async (req, res) => {
//     res.json({ message: 'Email not found from server' });
//   });
 
 
 



// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

 connector.fire();
