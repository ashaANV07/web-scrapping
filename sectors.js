"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=GAKO2ZGRMATKKY14";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  }
);

"use strict";

// const request = require("request");
// const fs = require("fs");
// const { Parser } = require("json2csv");

// // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// const url =
//   "https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=GAKO2ZGRMATKKY14";

// request.get(
//   {
//     url: url,
//     json: true,
//     headers: { "User-Agent": "request" },
//   },
//   (err, res, data) => {
//     if (err) {
//       console.log("Error:", err);
//     } else if (res.statusCode !== 200) {
//       console.log("Status:", res.statusCode);
//     } else {
//       // Data is successfully parsed as a JSON object
//       try {
//         // Flatten and prepare data for CSV
//         const fields = Object.keys(data);
//         const parser = new Parser({ fields });
//         const csv = parser.parse(data);

//         // Save the CSV to a file
//         fs.writeFile("etf_profile.csv", csv, (err) => {
//           if (err) {
//             console.error("Error writing to CSV file:", err);
//           } else {
//             console.log("CSV file saved successfully!");
//           }
//         });
//       } catch (error) {
//         console.error("Error parsing JSON to CSV:", error);
//       }
//     }
//   }
// );
