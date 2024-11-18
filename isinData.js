const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = "./SchemeData.csv"; // Path to your uploaded CSV file
const outputFilePath = './output.csv'; // Path to save the output CSV

// Create a CSV writer to write the final output
const csvWriter = createCsvWriter({
  path: outputFilePath,
  header: [
    {id: 'code', title: 'Code'},
    {id: 'scheme_name', title: 'Scheme Name'},
    {id: 'nav', title: 'NAV'},
    {id: 'isin_payout', title: 'ISIN Div Payout'},
    {id: 'isin_growth', title: 'ISIN Growth'},
    {id: 'isin_reinvestment', title: 'ISIN Div Reinvestment'}
  ]
});

let results = []; // To store successful API data
let failedCodes = []; // To store failed codes

// Function to fetch data from the API for each code
const fetchSchemeData = async (code, row) => {
  try {
    const response = await axios.get(`https://api.mfapi.in/mf/${code}/latest`);
    const { meta, data } = response.data;
    const latestNav = data[0]?.nav || 'N/A'; // Handle missing NAV data
    
    // Store successful response data
    results.push({
      code: meta.scheme_code,
      scheme_name: meta.scheme_name,
      nav: latestNav,
      isin_payout: row['ISIN Div Payout/ ISIN GrowthISIN Div Reinvestment'], // Add this from the CSV row
      isin_growth: 'N/A', // Placeholder for growth ISIN if available
      isin_reinvestment: 'N/A' // Placeholder for reinvestment ISIN if available
    });

    console.log(`Success for code: ${meta.scheme_code} - NAV: ${latestNav}`);
  } catch (error) {
    console.error(`Error fetching data for code ${code}:`, error.message);
    failedCodes.push(code); // Track failed codes
  }
};

// Function to process the CSV file and fetch data for each code
const processCsvFile = () => {
  fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      const code = row.Code; // Use the correct column name 'Code' from the CSV
      if (code && !failedCodes.includes(code)) { // Skip already failed codes
        await fetchSchemeData(code, row);
      }
    })
    .on('end', async () => {
      console.log('Finished processing CSV file.');
      // Write the collected data to the output CSV
      await csvWriter.writeRecords(results);
      console.log('Data successfully saved to CSV:', outputFilePath);

      // Optionally, log the failed codes
      if (failedCodes.length > 0) {
        console.log('These codes failed during processing:', failedCodes);
      }
    });
};

processCsvFile();
