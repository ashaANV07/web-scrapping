const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const outputData = [];
const ashaData = [];

// Load 'output.csv'
fs.createReadStream("./output.csv")
  .pipe(csv())
  .on("data", (row) => {
    outputData.push(row);
  })
  .on("end", () => {
    // Load 'asha.csv'
    fs.createReadStream("./asha.csv")
      .pipe(csv())
      .on("data", (row) => {
        ashaData.push(row);
      })
      .on("end", () => {
        // Filter records based on 90% NAV match
        const matchedSchemes = [];

        outputData.forEach((outputRow) => {
          const matchingAshaRow = ashaData.find((ashaRow) => {
            const navOutput = parseFloat(outputRow.nav);
            const navAsha = parseFloat(ashaRow.currentNav);
            const difference = Math.abs(navOutput - navAsha);
            const matchPercentage = (1 - difference / navOutput) * 100;
            return matchPercentage >= 90;
          });

          if (matchingAshaRow) {
            matchedSchemes.push({
              scheme_name: outputRow.scheme_name,
              scheme_code: outputRow.scheme_code,
              isin: outputRow.isin,
              nav: outputRow.nav,
            });
          }
        });

        // Write to a new CSV file
        const csvWriter = createCsvWriter({
          path: "./matched_schemes.csv",
          header: [
            { id: "scheme_name", title: "Scheme Name" },
            { id: "scheme_code", title: "Scheme Code" },
            { id: "isin", title: "ISIN" },
            { id: "nav", title: "NAV" },
          ],
        });

        csvWriter.writeRecords(matchedSchemes).then(() => {
          console.log("The matched schemes CSV file was created successfully.");
        });
      });
  });
