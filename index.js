const axios = require("axios").default;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

async function loginAndScrape() {
  const cookieJar = new CookieJar();
  const axiosWithCookies = wrapper(axios.create({ jar: cookieJar }));

  // Use your static token here
  const staticToken = "eyJpZCI6ImUyZDAxMjc4LTcxZDMtNDFkOS05ZTQwLTAzOGRlMDE3Yzc3YyIsImMiOjE3MjgzNzQ2MDQ1MDAsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=";

  try {
    // Step 1: Log in to obtain cookies
    const loginResponse = await axiosWithCookies.post(
      "https://arhamshare.investwell.app/webapi/auth/login",
      {
        email: "ArhamAdmin",
        password: "Arham@2010",
        brokerDomain: "arhamshare",
        isEncryption: true,
        selectedUser: {},
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        },
      }
    );

    console.log("Response Headers from Login:", loginResponse.headers);
    console.log("Login Response Data:", loginResponse.data);

    if (loginResponse.status === 200) {
      console.log("Login successful, cookies received.");

      // Step 2: Fetch data using the static token
      const dataResponse = await axiosWithCookies.get(
        "https://arhamshare.investwell.app/webapi/broker/utilities/getAllCategoriesAndSubCategories?refreshKey=Tue+Oct+08+2024+14:23:09+GMT%2B0530",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
            "Authorization": `Bearer ${staticToken}`, // Use static token here
          },
        }
      );

      // Step 3: Handle the scraped data
      console.log("Data fetched:", dataResponse.data);

      // Define CSV writer
      const csvWriter = createCsvWriter({
        path: "categories.csv",
        header: [
          { id: "id", title: "ID" }, 
          { id: "name", title: "Name" },
          // Add more fields based on your data structure
        ],
      });

      // Prepare data for CSV writing
      const records = dataResponse.data.map((item) => ({
        id: item.id, 
        name: item.name, 
      }));

      // Write records to CSV
      await csvWriter.writeRecords(records);
      console.log("Data written to CSV file successfully.");
    } else {
      console.log("Login failed:", loginResponse.data);
    }
  } catch (error) {
    console.error("Error during login and data fetching:", error.response ? error.response.data : error.message);
  }
}

loginAndScrape();
