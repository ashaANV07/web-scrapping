const axios = require('axios');
const cheerio = require('cheerio');

// URL of the website you want to scrape
const url = 'https://scripbox.com/_next/data/845164/mutual-fund/amc/kotak-mahindra.json?amcSlug=';

async function scrapeData() {
    try {
        // Fetch the HTML of the page
        const { data } = await axios.get(url);

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Array to store scraped data
        const scrapedData = [];

        // Example: Select and extract data based on CSS selectors
        $('.class-or-id').each((index, element) => {
            const name = $(element).text();
            const link = $(element).attr('href');

            // Store data in an array instead of printing
            scrapedData.push({ name, link });
        });

        // At this point, you have the scraped data stored in the array
        // You can further process or store the data as needed

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

scrapeData();
