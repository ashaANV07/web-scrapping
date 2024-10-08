const axios = require("axios").default;
const qs = require("querystring");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

async function loginAndScrape() {
  try {
    const loginResponse = await axios.post(
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
        withCredentials: true,
      }
    );
    console.log("Response Headers:", loginResponse.headers);

    if (loginResponse.status === 200) {
      const cookies = loginResponse.headers["set-cookie"];
      console.log("Login successful, cookies received:", cookies);

      const dataResponse = await axios.get(
        "https://arhamshare.investwell.app/webapi/broker/utilities/getAllCategoriesAndSubCategories?refreshKey=Tue+Oct+08+2024+11%3A30%3A50+GMT%2B0530",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
            Cookie: cookies.join("; "),
          },
          withCredentials: true,
        }
      );

      console.log("Data fetched:", dataResponse.data);

      //Define CSV writer
      const csvWriter = createCsvWriter({
        path: "categories.csv",
        header: [
          { id: "id", title: "ID" },
          { id: "name", title: "Name" },
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
    console.error("Error during login and data fetching:", error.message);
  }
}

loginAndScrape();

// const axios = require("axios").default;

// async function loginAndScrape() {
//   try {
//     const loginResponse = await axios.post(
//       "https://arhamshare.investwell.app/webapi/auth/login",
//       {
//         email: "ArhamAdmin",
//         password: "Arham@2010",
//         brokerDomain: "arhamshare",
//         isEncryption: true,
//         selectedUser: {},
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json, text/plain, */*",
//           "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
//         },
//         withCredentials: true,
//       }
//     );

//     console.log("Login Response:", loginResponse.data);
//     console.log("Response Headers:", loginResponse.headers);

//     if (loginResponse.status === 200) {
//       // Handle successful login (if any token is returned)
//       const token = loginResponse.data.token; // Adjust based on response
//       if (token) {
//         console.log("Login successful, token received:", token);
//         // Fetch data here...
//       } else {
//         console.log("No token received.");
//       }
//     } else {
//       console.log("Login failed:", loginResponse.data);
//     }
//   } catch (error) {
//     // Improved error handling
//     if (error.response) {
//       console.error("Error during login:", error.response.data);
//       console.error("Response Status:", error.response.status);
//       console.error("Response Headers:", error.response.headers);
//     } else {
//       console.error("Error:", error.message);
//     }
//   }
// }

// loginAndScrape();
