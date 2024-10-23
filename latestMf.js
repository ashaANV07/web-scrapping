const axios = require("axios");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const path = require("path");

(async () => {
  const pLimit = (await import("p-limit")).default;

  const limit = pLimit(10);
  const folderPath = path.join(__dirname, "SchemesData");

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Show loading message
  function showLoading(message) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(message);
  }

  async function fetchSchemeDetails(scheme) {
    const { schemeCode, schemeName } = scheme;
    try {
      const schemeDetailsResponse = await axios.get(
        `https://api.mfapi.in/mf/${schemeCode}/latest`
      );
      const schemeDetails = schemeDetailsResponse.data;

      if (schemeDetails && schemeDetails.data && schemeDetails.meta) {
        const { nav, date } = schemeDetails.data[0];
        const { fund_house, scheme_type, scheme_category } = schemeDetails.meta;

        return {
          schemeCode,
          schemeName,
          nav,
          date,
          fund_house,
          scheme_type,
          scheme_category,
        };
      }
    } catch (error) {
      console.error(
        `Error fetching details for scheme ${schemeCode}:`,
        error.message
      );
    }
    return null;
  }

  // async function fetchFullSchemeDetails(schemeCode) {
  //   try {
  //     const fullDetailsResponse = await axios.get(
  //       `https://api.mfapi.in/mf/${schemeCode}`
  //     );
  //     return fullDetailsResponse.data;
  //   } catch (error) {
  //     console.error(
  //       `Error fetching full details for scheme ${schemeCode}:`,
  //       error.message
  //     );
  //   }
  //   return null;
  // }

  async function saveSchemeDataToCsv(schemeCode, schemeData) {
    const csvWriter = createCsvWriter({
      path: path.join(folderPath, `Scheme_${schemeCode}.csv`),
      header: [
        { id: "date", title: "Date" },
        { id: "nav", title: "NAV" },
      ],
    });

    if (schemeData && schemeData.data) {
      await csvWriter.writeRecords(schemeData.data);
      console.log(
        `\nCSV file for scheme ${schemeCode} has been written successfully.`
      );
    } else {
      console.log(`\nNo data found for scheme ${schemeCode}.`);
    }
  }

  async function fetchSchemesAndSave() {
    try {
      const schemesResponse = await axios.get("https://api.mfapi.in/mf");
      const schemes = schemesResponse.data;

      const schemeDetailsPromises = schemes.map((scheme) =>
        limit(() => fetchSchemeDetails(scheme))
      );
      const schemeDetailsArray = await Promise.all(schemeDetailsPromises);

      const validSchemes = schemeDetailsArray.filter(
        (scheme) => scheme !== null && scheme.date === "13-10-2024"
      );

      if (validSchemes.length > 0) {
        console.log(
          "Fetching full details and writing CSV files for the following schemes:"
        );
        for (let i = 0; i < validSchemes.length; i++) {
          const scheme = validSchemes[i];
          showLoading(
            `Processing scheme ${i + 1} of ${
              validSchemes.length
            } - Scheme Code: ${scheme.schemeCode}`
          );
          const fullSchemeData = await fetchFullSchemeDetails(
            scheme.schemeCode
          );
          await saveSchemeDataToCsv(scheme.schemeCode, fullSchemeData);
        }
      } else {
        console.log("No data found for the specified date.");
      }
    } catch (error) {
      console.error("Error fetching schemes:", error.message);
    } finally {
      console.log("\nProcessing complete.");
    }
  }

  // Run the function
  fetchSchemesAndSave();
})();
