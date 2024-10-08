a = fetch("https://arhamshare.investwell.app/webapi/broker/txn/getFunds?orderBy=name&orderByDesc=false&pageSize=100&currentPage=1&refreshKey=Tue+Oct+08+2024+16:58:42+GMT%2B0530", {
    "headers": {
      "accept": "application/json, text/plain, */*",
    //   "accept-language": "en-US,en;q=0.9",
    //   "baggage": "sentry-environment=production,sentry-release=investwell%401.0.0,sentry-public_key=b479f0f019cc48f583321de7a24e228a,sentry-trace_id=40b68b1367864a8a9735080c7083ff86,sentry-sample_rate=0.01,sentry-sampled=false",
    //   "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
    //   "sec-ch-ua-mobile": "?0",
    //   "sec-ch-ua-platform": "\"Windows\"",
    //   "sec-fetch-dest": "empty",
    //   "sec-fetch-mode": "cors",
    //   "sec-fetch-site": "same-origin",
    //   "sentry-trace": "40b68b1367864a8a9735080c7083ff86-bbda3d70e166d825-0",
    //   "cookie": "_ga=GA1.2.321505837.1728303634; _gid=GA1.2.365791434.1728303634; d_ux=9518bc3d3054bbfef5cadb723a55ac681b2c0a288cd5e36b445450b3f21fa125; _hjSessionUser_2459651=eyJpZCI6IjNkZjZmMDE5LTk5OWUtNWQ3ZC1iYjg4LTM2N2UyYmMxYjk3NCIsImNyZWF0ZWQiOjE3MjgzMDM2MzMxNTEsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_2459651=eyJpZCI6IjdiODIwNTdjLWExYmMtNDYxNS04YTFiLWYzOGJhNTk0OGY1MSIsImMiOjE3MjgzODYyNDY4NjYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _ga_GF0GQSBRYP=GS1.2.1728386413.4.1.1728386718.0.0.0; c_ux=1800000; connect.sid=s%3A102305-1-daDxuha6HoZGcsiTmnz-tOG1mj9Bbthe.EewVcXriQ4C5zMRnjyvD%2BarSnmWpXUQh37Wt2K%2Bhbuw; _gat=1; _ga_5JJ5GXPC1S=GS1.2.1728386246.7.1.1728386921.0.0.0",
    //   "Referer": "https://arhamshare.investwell.app/",
    //   "Referrer-Policy": "strict-origin"
    },
    "body": null,
    "method": "GET"
  }).then(res => {

    console.log("AA:",res)
  });
  