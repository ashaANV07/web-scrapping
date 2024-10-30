// const puppeteer = require("puppeteer");

// async function fetchViewStateWithPuppeteer() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://bsestarmfdemo.bseindia.com/AOFDownload.aspx");

//   const session = axios.create({
//     withCredentials: true, // Enable cookies
//   });

//   const viewState = await page.$eval("#__VIEWSTATE", (el) => el.value);
//   const viewStateGenerator = await page.$eval(
//     "#__VIEWSTATEGENERATOR",
//     (el) => el.value
//   );
//   const eventValidation = await page
//     .$eval("#__EVENTVALIDATION", (el) => el.value)
//     .catch(() => undefined);

//   await browser.close();

//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Accept: "application/pdf",
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
//     Referer: "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
//     Origin: "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
//   };

//   const data = new URLSearchParams({
//     __VIEWSTATE: viewState,
//     __VIEWSTATEGENERATOR: viewStateGenerator,
//     __VIEWSTATEENCRYPTED: "",
//     __EVENTVALIDATION: eventValidation,
//     ddlDocType: "NormalAOF",
//     txtClientCode: "a0001",
//     btnDownload: "Download",
//   });

//   const responsePost = await session.post(
//     "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
//     data,
//     { headers }
//   );

//   if (responsePost.status === 200) {
//     // Save the PDF file
//     // fs.writeFileSync("AOF_6405_a0001.pdf", responsePost.data);
//     console.log("PDF downloaded successfully.");
//   } else {
//     console.log("Failed to download PDF. Response content:");
//     console.log(responsePost.data);
//   }

//   console.log(`Status Code: ${responsePost.status}`);
// }

// fetchViewStateWithPuppeteer();

const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");

async function downloadPDF() {
  // Step 1: Use Puppeteer to launch the browser and open the page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Step 2: Navigate to the AOFDownload page to retrieve VIEWSTATE and other fields
  await page.goto("https://bsestarmfdemo.bseindia.com/AOFDownload.aspx", {
    waitUntil: "networkidle2",
  });

  // Step 3: Wait for the necessary elements to load
  await page.waitForSelector("#__VIEWSTATE");

  // Step 4: Retrieve values for VIEWSTATE, VIEWSTATEGENERATOR, and EVENTVALIDATION
  const viewState = await page.$eval("#__VIEWSTATE", (el) => el.value);
  const viewStateGenerator = await page.$eval(
    "#__VIEWSTATEGENERATOR",
    (el) => el.value
  );
  const eventValidation = await page.$eval(
    "#__EVENTVALIDATION",
    (el) => el.value
  );

  // Step 5: Get cookies from the page to maintain session state
  //   const cookies = await page.cookies();
  await browser.close();

  // Step 6: Prepare the headers for the POST request
  const headers = {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "max-age=0",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie:
      "path=/xml-data; AuthToken=31e08982-be25-4111-8140-cd8087ebd0d9; ASP.NET_SessionId=hgochb4fwmzzlzadsmo0qeys",
    Origin: "https://bsestarmfdemo.bseindia.com",
    Referer: "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
    "Sec-Fetch-Dest": "iframe",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "sec-ch-ua":
      '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    // Cookie: cookies
    //   .map((cookie) => `${cookie.name}=${cookie.value}`)
    //   .join("; "),
  };

  // Step 7: Prepare the data for the POST request with necessary parameters
  const data = new URLSearchParams({
    __EVENTTARGET: "",
    __EVENTARGUMENT: "",
    __LASTFOCUS: "",
    __VIEWSTATE: viewState,
    __VIEWSTATEGENERATOR: viewStateGenerator,
    __VIEWSTATEENCRYPTED: "",
    __EVENTVALIDATION: eventValidation,
    ddlDocType: "NormalAOF",
    txtClientCode: "a0001",
    btnDownload: "Download",
    hdnNormal: "",
    hdnRIA: "",
    hdnIsCorp: "N",
  });

  console.log("Request Data:", data.toString());

  // Step 8: Send the POST request to download the PDF using axios
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
      data.toString(),
      {
        headers,
        responseType: "arraybuffer", // Setting this to handle binary data
      }
    );

    console.log(`Status Code: ${response.status}`);
    const contentType = response.headers["content-type"];
    console.log(`Content-Type: ${contentType}`);

    // Step 9: Save the PDF file if the content type is application/pdf
    if (contentType.includes("application/pdf")) {
      fs.writeFileSync("AOF_6405_a0001.pdf", response.data);
      console.log("PDF downloaded successfully.");
    } else {
      console.error("Received non-PDF response:", contentType);
      console.log("Response body:", response.data.toString()); // Log the HTML response for debugging
    }
  } catch (error) {
    console.error("Error downloading PDF:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data.toString("utf-8")); // Convert buffer to string
      console.error("Response headers:", error.response.headers);
    }
  }
}

// Run the function
downloadPDF();
