const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv'); // To convert JSON to CSV

const fetchData = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://arhamshare.investwell.app/webapi/broker/utilities/getTopSchemesForMultiSelect',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'https://arhamshare.investwell.app',
        'Referer': 'https://arhamshare.investwell.app/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'baggage': 'sentry-environment=production,sentry-release=investwell%401.0.0,sentry-public_key=b479f0f019cc48f583321de7a24e228a,sentry-trace_id=53590117e7cd4b6a9d57efdddb0d61da,sentry-sample_rate=0.01,sentry-sampled=false',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sentry-trace': '53590117e7cd4b6a9d57efdddb0d61da-bed4989e8484ef5c-0',
        'view-state': 'c7dde67a3b2054223db0f4c98f3be02e05644c5985ad78f6b0cba10c84025bed2093f7473194e6d2d9f469cc2d02e1c3',
        'Cookie': '_ga=GA1.2.321505837.1728303634; _gid=GA1.2.365791434.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_2459651=eyJpZCI6IjdiODIwNTdjLWExYmMtNDYxNS04YTFiLWYzOGJhNTk0OGY1MSIsImMiOjE3MjgzODYyNDY4NjYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _ga_GF0GQSBRYP=GS1.2.1728386413.4.1.1728387547.0.0.0; _gat=1; c_ux=1800000; connect.sid=s%3A102305-1-SVNPtZVpf8N6Q941gHG4GCSCu1xheMjO.PhBFRl6tuLL3fFCYO0OMddrdffJP7%2FaAPFgydyfQ0SE; _ga_5JJ5GXPC1S=GS1.2.1728386246.7.1.1728388535.0.0.0'
      },
      data: {
        filters: [{ schemeNameLike: null, aumGreaterEqual: null }],
        orderBy: '1Year',
        mySchemes: 0,
        orderByDesc: true,
        pageSize: 2000,
        selectedUser: {}
      }
    });

    const data = response.data.result.data;

    // Convert JSON to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Save CSV to file
    fs.writeFileSync('data.csv', csv);

    console.log('Data saved to data.csv');

  } catch (error) {
    console.error('Error fetching data:', error.response?.status, error.response?.data);
  }
};

// Call the function
fetchData();
