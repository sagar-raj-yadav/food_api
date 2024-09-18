import express from 'express';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Function to read data from a file
const getDataFromFile = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Error reading ${fileName}: ${err.message}`);
  }
};

// Endpoint for food categories
app.get('/api/category', async (req, res) => {
  try {
    const data = await getDataFromFile('foodCategory.json');
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint for food data
app.get('/api/foodData', async (req, res) => {
  try {
    const data = await getDataFromFile('foodData.json');
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the ES module JSON API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
