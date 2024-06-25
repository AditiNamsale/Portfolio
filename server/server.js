// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Contact = require('./models/contact'); // Ensure this path is correct

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received data:', req.body);
  const newContact = new Contact({ name, email, phone, message });
  try {
    const savedContact = await newContact.save();
    console.log('Saved contact:', savedContact);
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
