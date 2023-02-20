const express = require('express');
const request = require('request-promise');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;
const app = express();
const apiKey = process.env.SCRAPER_API_KEY;

app.use(express.json());

const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to the News API!');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
   

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));