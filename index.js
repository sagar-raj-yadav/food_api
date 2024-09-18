import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors'; // Import the cors package

const app = express();
const port = process.env.PORT || 5000;

// Apply CORS middleware to allow all origins
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

// Endpoint for category data
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

// Endpoint for restaurant names
app.get('/api/restaurantName', async (req, res) => {
  try {
    const data = await getDataFromFile('RestaurantName.json');
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint for restaurant items with an optional ID
app.get('/api/restaurantItems/:id?', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getDataFromFile('RestaurantItems.json');
    
    if (id) {
      // Filter the items by the given ID
      const filteredData = data.filter(item => item.id === parseInt(id, 10));
      if (filteredData.length > 0) {
        res.json(filteredData);
      } else {
        res.status(404).send('Item not found');
      }
    } else {
      res.json(data);
    }
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
