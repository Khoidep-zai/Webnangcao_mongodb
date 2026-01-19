// CLI : npm install express body-parser --save
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// database connection
require('./utils/MongooseUtil');

// middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// apis
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// apis
app.use('/api/admin', require('./api/admin.js'));

// start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
