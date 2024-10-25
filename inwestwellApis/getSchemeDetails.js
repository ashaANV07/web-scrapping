const axios = require("axios");
import token from "./auth";

const isinNo = "INF846K01164";
const getSchemeDeatils = async (isinNo, token) => {
  try {
    const response = await axios.get(
      `https://demo.investwell.io/api/aggregator/utils/getFactsheetData?isinNo=${isinNo}&token=${token}`
    );

    const data = response.results.data;
    return data;
  } catch (error) {
    console.log("Error in getSchemeDeatils:", error);
  }
};

getSchemeDeatils(isinNo, token);
