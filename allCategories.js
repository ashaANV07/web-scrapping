const axios = require("axios");
const fs = require("fs");
const { Parser } = require("json2csv"); // To convert JSON to CSV

const fetchData = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "https://arhamshare.investwell.app/webapi/broker/utilities/getAllCategoriesAndSubCategories",
      headers: {
        Accept: "application/json, text/plain, */*",
        Cookie:
          "_ga=GA1.2.321505837.1728303634; _gid=GA1.2.365791434.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_2459651=eyJpZCI6ImY4NWU1MGNjLTgzOWMtNGYxNi05ZTM3LTViZmE1YmE2ZjNjNyIsImMiOjE3Mjg0NTQzODIyNDgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _ga_GF0GQSBRYP=GS1.2.1728454641.7.1.1728454643.0.0.0; _gat=1; c_ux=1800000; connect.sid=s%3A102305-1-S7pD_vJ4XClAupea0rV6EPvi1BtK9ttc.fO6CVu%2FdQZacK3uODftdyeGYhavMWvoBfZF1fIG66pY; _ga_5JJ5GXPC1S=GS1.2.1728454383.9.1.1728455326.0.0.0", // Replace with your actual cookie from Postman
      },
      params: {
        refreshKey: "Wed+Oct+09+2024+11:58:51+GMT%2B0530",
      },
    });

    // Extract the result object
    const result = response.data.result;

    // Flatten the data from the various categories
    const flattenData = (categoryName, categoryArray) => {
      return categoryArray.map((item) => ({
        categoryGroup: categoryName, // Add the category group (e.g., "Equity", "Other")
        category: item.category,
        objectiveid: item.objectiveid,
        AUMObjective: item.AUMObjective,
      }));
    };

    // Flatten the data for all categories
    const equityData = flattenData("Equity", result.Equity);
    const otherData = flattenData("Other", result.Other);
    const liquidAndUltraShortData = flattenData(
      "Liquid and Ultra Short",
      result["Liquid and Ultra Short"]
    );
    const debtData = flattenData("Debt", result.Debt);
    const hybridData = flattenData("Hybrid", result.Hybrid);
    const arbitrageData = flattenData("Arbitrage", result.Arbitrage);

    // Combine all categories into one array
    const allData = [
      ...equityData,
      ...otherData,
      ...liquidAndUltraShortData,
      ...debtData,
      ...hybridData,
      ...arbitrageData,
    ];

    // Convert JSON to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(allData);

    // Save CSV to file
    fs.writeFileSync("resultData.csv", csv);

    console.log("Data saved to resultData.csv");
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.status,
      error.response?.data
    );
  }
};

// Call the function
fetchData();
