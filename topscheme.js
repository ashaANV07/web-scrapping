const axios = require("axios");
const fs = require("fs");
const { Parser } = require("json2csv"); // To convert JSON to CSV

const fetchData = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://arhamshare.investwell.app/webapi/broker/utilities/getTopSchemesForMultiSelect",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Connection: "keep-alive",
        "Content-Type": "application/json",
        Origin: "https://arhamshare.investwell.app",
        Referer: "https://arhamshare.investwell.app/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        baggage:
          "sentry-environment=production,sentry-release=investwell%401.0.0,sentry-public_key=b479f0f019cc48f583321de7a24e228a,sentry-trace_id=cbc6f17d87da46f0a00ce6da06eaa1d5",
        Cookie:
          "_ga=GA1.2.321505837.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.1125750289.1731308214; _ga_GF0GQSBRYP=GS1.2.1731578143.25.1.1731578146.0.0.0; _gat=1; c_ux=1800000; connect.sid=s%3A102305-1-2wnzEqFE7KeDamAYILX9s1EUOIyyufCS.XOLRpGJGTYSZtAuNhEM3eV9h0IW7yMBuju3TRVrcJDg; _ga_5JJ5GXPC1S=GS1.2.1731578147.69.1.1731578355.0.0.0",
      },
      data: {
        filters: [{ schemeNameLike: null, aumGreaterEqual: null }],
        orderBy: "1Year",
        mySchemes: 0,
        orderByDesc: true,
        pageSize: 2000,
        selectedUser: {},
      },
    });

    const data = response.data.result.data;

    // Convert JSON to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Save CSV to file
    fs.writeFileSync("asha.csv", csv);

    console.log("Data saved to data.csv", data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.status,
      error.response?.data
    );
  }
};

fetchData();
