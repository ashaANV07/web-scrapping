const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Start a session
const session = axios.create({
  baseURL: "https://bsestarmfdemo.bseindia.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  },
  withCredentials: true,
});

const indexUrl = "/Index.aspx";

async function extractHiddenFields(html) {
  const $ = cheerio.load(html);
  const viewstate = $("#__VIEWSTATE").val();
  const eventValidation = $("#__EVENTVALIDATION").val();
  const viewstateGenerator = $("#__VIEWSTATEGENERATOR").val();

  console.log("Extracted Hidden Fields:", {
    viewstate,
    eventValidation,
    viewstateGenerator,
  });

  return { viewstate, eventValidation, viewstateGenerator };
}

async function login() {
  try {
    const responseIndex = await session.get(indexUrl);
    const hiddenFields = await extractHiddenFields(responseIndex.data);
    console.log("first", hiddenFields);

    // Step 2: Prepare the payload for the login form
    const loginPayload = new URLSearchParams({
      __VIEWSTATE: hiddenFields.viewstate,
      __VIEWSTATEGENERATOR: hiddenFields.viewstateGenerator,
      __EVENTVALIDATION: hiddenFields.eventValidation,
      txtUserId: "640501",
      txtMemberId: "6405",
      txtPassword: "Abc@12345",
      btnLogin: "Login",
    //   txtMobileNo: "",
    //   txtOTP: "",
    });

    console.log("Login Payload:", loginPayload.toString());
    // Step 3: Send the POST request to login
    const responseLogin = await session.post(indexUrl, loginPayload);
    console.log("Login Response:", responseLogin.data);

    // Check if login was successful
    const $loginCheck = cheerio.load(responseLogin.data);
    const errorMsg = $loginCheck("#lblMsg").text().trim();
    if (errorMsg) {
      console.log(`Login failed: ${errorMsg}`);
      return; 
    } else {
      console.log("Login successful.");
    }

    const aofUrl = "/AOFDownload.aspx";
    const responseAof = await session.get(aofUrl);
    const hiddenFieldsAof = await extractHiddenFields(responseAof.data);

    const downloadData = new URLSearchParams({
      __VIEWSTATE: hiddenFieldsAof.viewstate,
      __VIEWSTATEGENERATOR: hiddenFieldsAof.viewstateGenerator,
      __EVENTVALIDATION: hiddenFieldsAof.eventValidation,
      ddlDocType: "NormalAOF",
      txtClientCode: "a0001",
      btnDownload: "Download",
    });

    // Step 5: Send the POST request to download the PDF
    const responsePost = await session.post(aofUrl, downloadData, {
      responseType: "arraybuffer",
    });

    if (
      responsePost.status === 200 &&
      responsePost.headers["content-type"] === "application/pdf; charset=utf-8"
    ) {
      // Save the PDF file
      fs.writeFileSync("AOF_6405_a0001.pdf", responsePost.data);
      console.log("PDF downloaded successfully.");
    } else {
      console.log("Failed to download PDF. Response content:");
      console.log(responsePost.data.toString());
    }

    console.log(`Status Code: ${responsePost.status}`);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

login();
