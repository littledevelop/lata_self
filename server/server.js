const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require("axios");

const PORT = process.env.PORT || 5000;
const app = express();

const _dirname = path.resolve();
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

app.use(express.static(path.join(_dirname, '/frontend/build')));
const corsOptions = {
  origin:"https://lata-self.onrender.com",
  credential:true,
}
app.use(cors(corsOptions));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend","build","index.html"));
});
// Mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model('Contact', contactSchema);

const sendContactEmail = async ({ name, email, message }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.FROM_NAME,
          email: process.env.FROM_EMAIL,
        },
        to: [{ email: process.env.ADMIN_EMAIL }],
        replyTo: { email, name },
        subject: `New Contact Form Submission from ${name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        timeout: 10000,
      }
    );
  } catch (error) {
    console.error(
      "Brevo Contact Email Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send contact email");
  }
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Debugging log

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    console.log('📩 Received data:', { name, email, message });

    // Save to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('✅ Contact saved:', contact);

      // Send email via Brevo API
    await sendContactEmail({ name, email, message });

    // // Send email
    // const transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    //    tls: {
    //     rejectUnauthorized: false
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: 'latarana4u@gmail.com', // Change if needed
    //   subject: `New Contact Form Submission from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // };

    // await transporter.sendMail(mailOptions);
    // console.log('📤 Email sent');

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('❌ Error handling contact form:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
