const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/scrape', async (req, res) => {
    const url = req.body.url;
    console.log(`Received URL: ${url}`);

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Connection': 'keep-alive'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const product = {
            title: $('#productTitle').text().trim(),
            imageUrl: $('#imgTagWrapperId img').attr('src') || $('#landingImage').attr('src'),
            price: `₹${$('.priceToPay .a-price-whole').text().trim()}`,
            rating: $('.a-icon-alt').first().text().trim(),
            numberOfReviews: $('.centerColAlign #acrCustomerReviewText').text().trim(),
            description: $('.a-expander-content span').text().trim(),
            features: $('#feature-bullets ul li span').map((i, el) => $(el).text().trim()).get()
        };

        console.log(`Scraped product: ${JSON.stringify(product)}`);
        res.json({ product });
    } catch (error) {
        console.error('Error occurred while fetching product data:', error);
        res.status(500).json({ error: 'An error occurred while fetching the product data.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});