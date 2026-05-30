import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration — allow frontend origin (supports deployment)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json()); // Parse JSON request bodies

// ─── MongoDB Connection ───────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/telemedicine';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ Database Connection Error:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// ─── Mongoose Schema & Model ──────────────────────────────────────────
const patientSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  age:     { type: Number, required: true, min: 0 },
  gender:  { type: String, required: true, enum: ['male', 'female', 'other'] },
  phone:   { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Patient = mongoose.model('Patient', patientSchema);

// ─── API Routes ───────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '✅ Telemedicine Backend Running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Add a new patient
app.post('/api/patients', async (req, res) => {
  try {
    const { name, age, gender, phone, address } = req.body;
    console.log('📩 Received Data:', req.body);

    const patient = new Patient({ name, age, gender, phone, address });
    const savedPatient = await patient.save();

    res.status(201).json({
      message: '✅ Patient added successfully',
      patient: savedPatient,
    });
  } catch (err) {
    console.error('❌ Database Insert Error:', err.message);

    // Return validation errors with 400, others with 500
    const statusCode = err.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ error: err.message });
  }
});

// Fetch all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
