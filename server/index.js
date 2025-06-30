const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());

const storeUrls = {
  juvenileeg: 'https://juvenileeg.com',
  ctrlcairo: 'https://www.ctrlcairo.com',
  coddiwmple: 'https://coddiwmple.com',
};

// Helper function to fetch products from a single store
const fetchStoreProducts = async (storeKey) => {
  const baseUrl = storeUrls[storeKey];
  const url = `${baseUrl}/products.json`;
  try {
    const response = await axios.get(url);
    // Add the brand to each product
    return response.data.products.map(product => ({
      ...product,
      brand: storeKey,
    }));
  } catch (error) {
    console.error(`Error fetching products from ${storeKey}:`, error.message);
    return []; // Return empty array on error to not fail the whole request
  }
};

app.get('/api/products', async (req, res) => {
  try {
    // Fetch from all stores
    const allStores = Object.keys(storeUrls);
    const promises = allStores.map(storeKey => fetchStoreProducts(storeKey));
    const results = await Promise.all(promises);
    const allProducts = results.flat(); // .flat() is simpler than .flatMap(p => p)
    
    res.json({ products: allProducts });
  } catch (error) {
    console.error('Error aggregating products:', error);
    res.status(500).json({ message: 'Error fetching products from stores' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
