// // const axios = require("axios");

// // // Your request headers
// // const headers = {
// //   Accept: "application/json, text/plain, */*",
// //   "Accept-Encoding": "gzip, deflate, br, zstd",
// //   "Accept-Language": "en-US,en;q=0.9",
// //   Connection: "keep-alive",
// //   Cookie:
// //     "_ga=GA1.2.321505837.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.1181209574.1730109155; _ga_GF0GQSBRYP=GS1.2.1730112673.22.1.1730112673.0.0.0; _hjSession_2459651=eyJpZCI6IjI2ZTJkZGFiLTZiYTItNGUzOS1hOWM4LTgwZDViZjg5OTU0ZiIsImMiOjE3MzAxMTUxMzQ2NDcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gat=1; c_ux=1800000; connect.sid=s%3A102305-1-xRpyjproBJUPiACoavcVxf1LOez1QFu3.E6kjm7332tQzwMYgEyMyOmhjReAASJrqkScpUiy%2Bzgg; _ga_5JJ5GXPC1S=GS1.2.1730115135.49.1.1730115154.0.0.0",
// //   Referer: "https://arhamshare.investwell.app/",
// //   "User-Agent":
// //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
// //   "sec-ch-ua":
// //     '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
// //   "sec-ch-ua-mobile": "?0",
// //   "sec-ch-ua-platform": '"Windows"',
// //   "sec-fetch-dest": "empty",
// //   "sec-fetch-mode": "cors",
// //   "sec-fetch-site": "same-origin",
// //   "sentry-trace": "3c31d00ae23342b1a4597cd7aacf7023-b676f99be13616a2-0",
// // };

// // // API URL
// // const url =
// //   "https://arhamshare.investwell.app/webapi/broker/utilities/getFactSheetData?schemeId=e647f73a5ac8833cdb60ef214e4436af&refreshKey=Mon+Oct+28+2024+17:02:34+GMT%2B0530";

// // // Function to scrape data
// // async function scrapeData() {
// //   try {
// //     const response = await axios.get(url, { headers });

// //     // Handle and display the response data
// //     console.log(response.data);
// //   } catch (error) {
// //     console.error("Error fetching the data:", error);
// //   }
// // }

// // // Call the function
// // scrapeData();

// // const fs = require("fs");
// // const csv = require("csv-parser");

// // // Path to your CSV file
// // const csvFilePath = "F:/All Running Projects/web scrapping/TopSchemes.csv"; // Replace with the actual path to your CSV

// // let schemeIds = [];
// // const maxSchemeIds = 10; // We want the top 10 scheme IDs

// // // Read and parse the CSV file
// // fs.createReadStream(csvFilePath)
// //   .pipe(csv())
// //   .on("data", (row) => {
// //     // Assuming 'schemeId' is the column name in your CSV
// //     if (row.schemeId && schemeIds.length < maxSchemeIds) {
// //       schemeIds.push(row.schemeId);
// //     }
// //   })
// //   .on("end", () => {
// //     console.log("Top 10 Scheme IDs:", schemeIds);
// //   })
// //   .on("error", (error) => {
// //     console.error("Error reading CSV file:", error);
// //   });

// const fs = require("fs");
// const csv = require("csv-parser");
// const axios = require("axios");

// // Path to your CSV file
// const csvFilePath = "F:/All Running Projects/web scrapping/TopSchemes.csv"; // Replace with the actual path to your CSV

// let schemeIds = [];
// const maxSchemeIds = 10; // We want the top 10 scheme IDs

// // Your request headers
// const headers = {
//   Accept: "application/json, text/plain, */*",
//   "Accept-Encoding": "gzip, deflate, br, zstd",
//   "Accept-Language": "en-US,en;q=0.9",
//   Connection: "keep-alive",
//   Cookie:
//     "_ga=GA1.2.321505837.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.1181209574.1730109155; _ga_GF0GQSBRYP=GS1.2.1730112673.22.1.1730112673.0.0.0; _hjSession_2459651=eyJpZCI6IjI2ZTJkZGFiLTZiYTItNGUzOS1hOWM4LTgwZDViZjg5OTU0ZiIsImMiOjE3MzAxMTUxMzQ2NDcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gat=1; c_ux=1800000; connect.sid=s%3A102305-1-xRpyjproBJUPiACoavcVxf1LOez1QFu3.E6kjm7332tQzwMYgEyMyOmhjReAASJrqkScpUiy%2Bzgg; _ga_5JJ5GXPC1S=GS1.2.1730115135.49.1.1730115154.0.0.0",
//   Referer: "https://arhamshare.investwell.app/",
//   "User-Agent":
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
//   "sec-ch-ua":
//     '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
//   "sec-ch-ua-mobile": "?0",
//   "sec-ch-ua-platform": '"Windows"',
//   "sec-fetch-dest": "empty",
//   "sec-fetch-mode": "cors",
//   "sec-fetch-site": "same-origin",
//   "sentry-trace": "3c31d00ae23342b1a4597cd7aacf7023-b676f99be13616a2-0",
// };

// // Function to scrape data for each schemeId
// async function scrapeData(schemeId) {
//     console.log('schemeId', schemeId)
//   const url = `https://arhamshare.investwell.app/webapi/broker/utilities/getFactSheetData?schemeId=${schemeId}&refreshKey=Mon+Oct+28+2024+17:02:34+GMT%2B0530`;

//   try {
//     const response = await axios.get(url, { headers });
//     console.log(`Response for schemeId ${schemeId}:`, response.data);
//   } catch (error) {
//     console.error(`Error fetching data for schemeId ${schemeId}:`, error);
//   }
// }

// // Function to delay API calls
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// // Read and parse the CSV file
// fs.createReadStream(csvFilePath)
//   .pipe(csv())
//   .on("data", (row) => {
//     if (row.schemeId && schemeIds.length < maxSchemeIds) {
//       schemeIds.push(row.schemeId);
//     }
//   })
//   .on("end", async () => {
//     console.log("Top 10 Scheme IDs:", schemeIds);

//     // Call API for each schemeId with a delay of 1 second between calls
//     for (let i = 0; i < schemeIds.length; i++) {
//       await scrapeData(schemeIds[i]); // Call the API for the schemeId
//       await delay(1000); // Wait for 1 second before the next call
//     }
//   })
//   .on("error", (error) => {
//     console.error("Error reading CSV file:", error);
//   });

const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

// Path to your CSV file
const csvFilePath = "F:/All Running Projects/web scrapping/TopSchemes.csv"; // Replace with the actual path to your CSV

let schemeIds = [];
const maxSchemeIds = 1; // We want the top 10 scheme IDs

// Your request headers
const headers = {
  Accept: "application/json, text/plain, */*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
  Cookie:
    "_ga=GA1.2.321505837.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.1181209574.1730109155; _ga_GF0GQSBRYP=GS1.2.1730112673.22.1.1730112673.0.0.0; _hjSession_2459651=eyJpZCI6IjI2ZTJkZGFiLTZiYTItNGUzOS1hOWM4LTgwZDViZjg5OTU0ZiIsImMiOjE3MzAxMTUxMzQ2NDcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gat=1; c_ux=1800000; connect.sid=s%3A102305-1-xRpyjproBJUPiACoavcVxf1LOez1QFu3.E6kjm7332tQzwMYgEyMyOmhjReAASJrqkScpUiy%2Bzgg; _ga_5JJ5GXPC1S=GS1.2.1730115135.49.1.1730115154.0.0.0",
  Referer: "https://arhamshare.investwell.app/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  "sec-ch-ua":
    '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "sentry-trace": "3c31d00ae23342b1a4597cd7aacf7023-b676f99be13616a2-0",
};

// Function to scrape data for each schemeId
async function scrapeData(schemeId) {
  console.log("Fetching data for schemeId:", schemeId);
  const url = `https://arhamshare.investwell.app/webapi/broker/utilities/getFactSheetData?schemeId=${schemeId}&refreshKey=Mon+Oct+28+2024+17:02:34+GMT%2B0530`;

  try {
    const response = await axios.get(url, { headers });
    // You can handle the API response here and save the relevant data
    console.log(
      `Response for schemeId ${schemeId}:`,
      response.data.result.data
    );
  } catch (error) {
    console.error(
      `Error fetching data for schemeId ${schemeId}:`,
      error.message
    );
  }
}

// Function to add delay between API calls
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    // Assuming 'schemeId' is the column name in your CSV
    if (row.schemeId && schemeIds.length < maxSchemeIds) {
      schemeIds.push(row.schemeId);
    }
  })
  .on("end", async () => {
    console.log("Top 10 Scheme IDs:", schemeIds);

    // Call API for each schemeId with a delay of 1 second between calls
    for (let i = 0; i < schemeIds.length; i++) {
      await scrapeData(schemeIds[i]); // Call the API for the schemeId
      await delay(1000); // Wait for 1 second before the next call to avoid rate-limiting issues
    }
  })
  .on("error", (error) => {
    console.error("Error reading CSV file:", error.message);
  });
