const fs = require("fs");
const pdf = require("pdf-parse");
const axios = require("axios");

// const handleLogin = async () => {
//   try {
//     const response = await axios.post(
//       "https://demo.investwell.io/api/aggregator/auth/getAuthorizationToken",
//       {
//         authName: "demoapi",
//         password: "API@1001",
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     const token = response.result.token;
//     console.log("token", token);
//     return token;
//   } catch (error) {
//     console.log("Authentication Error:", error);
//   }
// };

const filePath = "./Isin_mutualFund.pdf";
const dataBuffer = fs.readFileSync(filePath);

// Use the static token
const staticToken =
  "8cc1cc29538fdbb82080a0e80c204a7c54e8b6edae158d7bd27cd635e765b5a6";

// Define the function to fetch scheme details
const getSchemeDetails = async (isin, token) => {
  try {
    const response = await axios.get(
      `https://demo.investwell.io/api/aggregator/utils/getFactsheetData?isinNo=${isin}&token=${token}`
    );

    const data = response.data.results.data;
    console.log(`Data for ISIN ${isin}:`, data);
    return data;
  } catch (error) {
    console.log(`Error in getSchemeDetails for ISIN ${isin}:`, error);
  }
};

// Process the PDF and fetch scheme details
const processPDF = async () => {
  try {
    // Step 1: Parse the PDF file
    const data = await pdf(dataBuffer);
    const text = data.text;

    // Split PDF text into lines and filter out empty ones
    const lines = text.split("\n").filter((line) => line.trim());

    // Extract rows matching the ISIN format
    const rows = lines
      .map((line) => {
        const match = line.match(/(INF\w{9})(.*?)(FMP|MF|DMF|CAP PRO)(\d+)/);
        if (match) {
          const isin = match[1].trim();
          const name = match[2].trim();
          const schemeCode = match[4].trim();
          return { isin, name, schemeCode };
        }
        return null;
      })
      .filter((row) => row !== null);

    // Handle the case where no rows are found
    if (rows.length === 0) {
      throw new Error(
        "No matching rows found. Please verify the PDF structure or regex."
      );
    }

    console.log("Parsed rows:", rows);

    // Step 2: Fetch scheme details for only the first 10 ISINs
    const limitedRows = rows.slice(0, 1); // Only the first 10 ISINs
    await Promise.all(
      limitedRows.map((row) => getSchemeDetails(row.isin, staticToken))
    );

    console.log("Data fetched for first 10 ISINs successfully.");
  } catch (err) {
    console.error("Error processing PDF:", err);
  }
};

// Start the PDF processing
processPDF();
