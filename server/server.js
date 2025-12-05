const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;
const app = express();

const _dirname = path.resolve();

// CORS - place before routes
const corsOptions = {
  origin: "https://lata-self.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect MongoDB
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Static build
app.use(express.static(path.join(_dirname, '/frontend/build')));

// Contact Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: 'Invalid email format' });

    console.log("📩 Received data:", { name, email, message });

    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log("✅ Contact saved:", contact);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "latarana4u@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📤 Email sent");

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("❌ Error handling contact form:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// React route
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
