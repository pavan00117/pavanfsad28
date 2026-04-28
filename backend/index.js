import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Tourism App Backend is running successfully! 🎉');
});
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all tourism places
app.get('/api/places', async (req, res) => {
  try {
    const places = await prisma.tourismPlace.findMany({
      include: {
        homestays: true
      }
    });
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Get a specific place and its nearby homestays
app.get('/api/places/:id', async (req, res) => {
  try {
    const place = await prisma.tourismPlace.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        homestays: true
      }
    });
    
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

// Get all homestays
app.get('/api/homestays', async (req, res) => {
  try {
    const homestays = await prisma.homestay.findMany({
      include: {
        place: true
      }
    });
    res.json(homestays);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch homestays' });
  }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create a booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { homestayId, guests, nights, totalPrice } = req.body;
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        homestayId,
        guests,
        nights,
        totalPrice
      }
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        homestay: {
          include: {
            place: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
