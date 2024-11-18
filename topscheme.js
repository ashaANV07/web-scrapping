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
          "sentry-environment=production,sentry-release=investwell%401.0.0,sentry-public_key=b479f0f019cc48f583321de7a24e228a,sentry-trace_id=53590117e7cd4b6a9d57efdddb0d61da,sentry-sample_rate=0.01,sentry-sampled=false",
        "sec-ch-ua":
          '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sentry-trace": "53590117e7cd4b6a9d57efdddb0d61da-bed4989e8484ef5c-0",
        "view-state":
          "c7dde67a3b2054223db0f4c98f3be02e05644c5985ad78f6b0cba10c84025bed2093f7473194e6d2d9f469cc2d02e1c3",
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

// Call the function
fetchData();
