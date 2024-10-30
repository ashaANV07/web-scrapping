const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Start a session
const session = axios.create({ withCredentials: true });
// console.log('session', session)

// Step 1: Load the initial page to establish session and capture hidden fields
const indexUrl = "https://bsestarmfdemo.bseindia.com/Index.aspx";

async function main() {
  try {
    // Step 1: Get hidden fields from the initial page
    const responseIndex = await session.get(indexUrl);
    const $index = cheerio.load(responseIndex.data);

    const viewstateIndex = $index("#__VIEWSTATE").val();
    const eventValidationIndex = $index("#__EVENTVALIDATION").val();
    const viewstateGeneratorIndex = $index("#__VIEWSTATEGENERATOR").val();

    // Step 2: Prepare the payload for the login form
    const loginPayload = new URLSearchParams({
      __VIEWSTATE: viewstateIndex,
      __VIEWSTATEGENERATOR: viewstateGeneratorIndex,
      __VIEWSTATEENCRYPTED: "",
      __EVENTVALIDATION: eventValidationIndex,
      txtUserId: "640501", 
      txtMemberId: "6405",
      txtPassword: "Abc@12345", 
      btnLogin: "Login",
      txtMobileNo: "",
      txtOTP: "",
    });

    // Step 3: Send the POST request to login
    const loginUrl = "https://bsestarmfdemo.bseindia.com/Index.aspx";
    const responseLogin = await session.post(loginUrl, loginPayload);

    // Check if login is successful
    console.log("Login Response:", responseLogin.data);

    // Step 4: Get the AOFDownload page to capture the necessary hidden fields
    // const aofUrl = "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx";
    // const responseAof = await session.get(aofUrl);
    // const $aof = cheerio.load(responseAof.data);

    // const viewstate = $aof("#__VIEWSTATE").val();
    // const eventValidation = $aof("#__EVENTVALIDATION").val();
    // const viewstateGenerator = $aof("#__VIEWSTATEGENERATOR").val();

    // // Step 5: Prepare headers and data for the POST request to download PDF
    // const data = new URLSearchParams({
    //   __VIEWSTATE: viewstate,
    //   __VIEWSTATEGENERATOR: viewstateGenerator,
    //   __VIEWSTATEENCRYPTED: "",
    //   __EVENTVALIDATION: eventValidation,
    //   ddlDocType: "NormalAOF",
    //   txtClientCode: "a0001",
    //   btnDownload: "Download",
    // });

    // // Step 6: Send the POST request to download the PDF
    // const responsePost = await session.post(aofUrl, data, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   responseType: "arraybuffer",
    // });

    // // Check if the response is a PDF
    // if (
    //   responsePost.status === 200 &&
    //   responsePost.headers["content-type"] === "application/pdf; charset=utf-8"
    // ) {
    //   // Save the PDF file
    //   fs.writeFileSync("AOF_6405_a0001.pdf", responsePost.data);
    //   console.log("PDF downloaded successfully.");
    // } else {
    //   console.log("Failed to download PDF. Response content:");
    //   console.log(responsePost.data.toString());
    // }

    console.log(`Status Code: ${responsePost.status}`);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();
