const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const Contact = require('./models/contact');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('./config'); // Ensure correct path

const app = express();
const port = process.env.PORT || 5000; // Ensure this matches your intended port

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Function to send a message to Telegram
const sendTelegramMessage = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Message sent to Telegram:', data);
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
};

// Define Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Received data:', req.body);
  const newContact = new Contact({ name, email, phone, message });
  try {
    const savedContact = await newContact.save();
    console.log('Saved contact:', savedContact);
    res.status(201).json(savedContact);

    // Send notification to Telegram
    const telegramMessage = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    await sendTelegramMessage(telegramMessage);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
