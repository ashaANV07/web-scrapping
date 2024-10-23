// const axios = require("axios");
// const fs = require("fs");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// // Define the CSV writer
// const csvWriter = createCsvWriter({
//   path: "schemesData.csv",
//   header: [
//     { id: "schemeCode", title: "Scheme Code" },
//     { id: "schemeName", title: "Scheme Name" },
//     { id: "nav", title: "NAV" },
//     { id: "date", title: "Date" },
//   ],
// });

// // Function to fetch scheme details
// async function fetchSchemeDetails(scheme) {
//   const { schemeCode, schemeName } = scheme;
//   try {
//     const schemeDetailsResponse = await axios.get(
//       `https://api.mfapi.in/mf/${schemeCode}/latest`
//     );
//     const schemeDetails = schemeDetailsResponse.data;

//     if (schemeDetails && schemeDetails.data) {
//       const { nav, date } = schemeDetails.data[0];
//       return {
//         schemeCode,
//         schemeName,
//         nav,
//         date,
//       };
//     }
//   } catch (error) {
//     console.error(
//       `Error fetching details for scheme ${schemeCode}:`,
//       error.message
//     );
//   }
//   return null;
// }

// // Function to fetch all schemes and save to CSV
// async function fetchSchemesAndSave() {
//   try {

//     const schemesResponse = await axios.get("https://api.mfapi.in/mf");
//     const schemes = schemesResponse.data;

//     // Fetch details for all schemes in parallel
//     const schemeDetailsPromises = schemes.map(fetchSchemeDetails);
//     const schemeDetailsArray = await Promise.all(schemeDetailsPromises);

//     // Filter out any null values (failed API calls)
//     const validSchemes = schemeDetailsArray.filter((scheme) => scheme !== null);

//     // Write the collected data to the CSV file
//     await csvWriter.writeRecords(validSchemes);
//     console.log("CSV file has been written successfully.");
//   } catch (error) {
//     console.error("Error fetching schemes:", error.message);
//   }
// }

// // Run the function
// fetchSchemesAndSave();

// // # Calculate the number of days since the last NAV update
// // days_since_last_nav = (current_date - latest_nav_date_obj).days

// // # Set threshold for activity status
// // threshold_days = 30
// // is_active = days_since_last_nav <= threshold_days

// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// // Show loading message
// function showLoading(message) {
//   process.stdout.clearLine();
//   process.stdout.cursorTo(0);
//   process.stdout.write(message);
// }

// // Define the folder path for storing the CSV files
// const folderPath = path.join(__dirname, "SchemesData");

// // Create the folder if it doesn't exist
// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath);
// }

// // Define the CSV writer
// const csvWriter = createCsvWriter({
//   path: path.join(folderPath, "schemesData.csv"),
//   header: [
//     { id: "fundHouse", title: "Fund House" },
//     { id: "schemeType", title: "Scheme Type" },
//     { id: "schemeCategory", title: "Scheme Category" },
//     { id: "schemeCode", title: "Scheme Code" },
//     { id: "schemeName", title: "Scheme Name" },
//     { id: "nav", title: "NAV" },
//     { id: "date", title: "Date" },
//   ],
// });

// // Function to fetch scheme details
// async function fetchSchemeDetails(scheme) {
//   const { schemeCode, schemeName } = scheme;
//   try {
//     const schemeDetailsResponse = await axios.get(
//       `https://api.mfapi.in/mf/${schemeCode}/latest`
//     );
//     const schemeDetails = schemeDetailsResponse.data;

//     if (schemeDetails && schemeDetails.data) {
//       const {
//         fund_house,
//         scheme_type,
//         scheme_category,
//         scheme_code,
//         scheme_name,
//       } = schemeDetails.meta;
//       const { nav, date } = schemeDetails.data[0];

//       return {
//         fundHouse: fund_house,
//         schemeType: scheme_type,
//         schemeCategory: scheme_category,
//         schemeCode: scheme_code,
//         schemeName: scheme_name,
//         nav,
//         date,
//       };
//     }
//   } catch (error) {
//     console.error(
//       `Error fetching details for scheme ${schemeCode}:`,
//       error.message
//     );
//   }
//   return null;
// }

// // Function to fetch all schemes and save to CSV
// (async () => {
//   const { default: pLimit } = await import("p-limit"); // Dynamic import for p-limit

//   // Set concurrency limit
//   const limit = pLimit(10);

//   try {
//     const schemesResponse = await axios.get("https://api.mfapi.in/mf");
//     const schemes = schemesResponse.data;

//     const totalSchemes = schemes.length;
//     let processedCount = 0;

//     // Limit the number of concurrent requests using p-limit
//     const schemeDetailsPromises = schemes.map((scheme) =>
//       limit(async () => {
//         const details = await fetchSchemeDetails(scheme);
//         processedCount++;
//         showLoading(`Processing ${processedCount}/${totalSchemes} schemes...`);
//         return details;
//       })
//     );

//     // Await all promises and filter out null values (failed API calls)
//     const schemeDetailsArray = await Promise.all(schemeDetailsPromises);
//     const validSchemes = schemeDetailsArray.filter((scheme) => scheme !== null);

//     // Write the collected data to the CSV file
//     await csvWriter.writeRecords(validSchemes);
//     console.log("\nCSV file has been written successfully.");
//   } catch (error) {
//     console.error("Error fetching schemes:", error.message);
//   }
// })();

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Show loading message
function showLoading(message) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(message);
}

// Define the folder path for storing the CSV files
const folderPath = path.join(__dirname, "SchemesData");

// Create the folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Define the CSV writer
const csvWriter = createCsvWriter({
  path: path.join(folderPath, "schemesData.csv"),
  header: [
    { id: "fundHouse", title: "Fund House" },
    { id: "schemeType", title: "Scheme Type" },
    { id: "schemeCategory", title: "Scheme Category" },
    { id: "schemeCode", title: "Scheme Code" },
    { id: "schemeName", title: "Scheme Name" },
    { id: "nav", title: "NAV" },
    { id: "date", title: "Date" },
  ],
});

// Function to check if the date is within the last three months
function isDateWithinLastThreeMonths(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  return date >= threeMonthsAgo && date <= now;
}

// Function to fetch scheme details
async function fetchSchemeDetails(scheme) {
  const { schemeCode, schemeName } = scheme;
  try {
    const schemeDetailsResponse = await axios.get(
      `https://api.mfapi.in/mf/${schemeCode}/latest`
    );
    const schemeDetails = schemeDetailsResponse.data;

    if (schemeDetails && schemeDetails.data) {
      const {
        fund_house,
        scheme_type,
        scheme_category,
        scheme_code,
        scheme_name,
      } = schemeDetails.meta;
      const { nav, date } = schemeDetails.data[0];

      // Check if the date is within the last three months
      if (isDateWithinLastThreeMonths(date)) {
        return {
          fundHouse: fund_house,
          schemeType: scheme_type,
          schemeCategory: scheme_category,
          schemeCode: scheme_code,
          schemeName: scheme_name,
          nav,
          date,
        };
      }
    }
  } catch (error) {
    console.error(
      `Error fetching details for scheme ${schemeCode}:`,
      error.message
    );
  }
  return null;
}

// Function to fetch all schemes and save to CSV
(async () => {
  const { default: pLimit } = await import("p-limit"); // Dynamic import for p-limit

  // Set concurrency limit
  const limit = pLimit(10);

  try {
    const schemesResponse = await axios.get("https://api.mfapi.in/mf");
    const schemes = schemesResponse.data;

    const totalSchemes = schemes.length;
    let processedCount = 0;

    // Limit the number of concurrent requests using p-limit
    const schemeDetailsPromises = schemes.map((scheme) =>
      limit(async () => {
        const details = await fetchSchemeDetails(scheme);
        processedCount++;
        showLoading(`Processing ${processedCount}/${totalSchemes} schemes...`);
        return details;
      })
    );

    // Await all promises and filter out null values (failed API calls)
    const schemeDetailsArray = await Promise.all(schemeDetailsPromises);
    const validSchemes = schemeDetailsArray.filter((scheme) => scheme !== null);

    // Write the collected data to the CSV file
    await csvWriter.writeRecords(validSchemes);
    console.log("\nCSV file has been written successfully.");
  } catch (error) {
    console.error("Error fetching schemes:", error.message);
  }
})();
