// const axios = require("axios");
// const cheerio = require("cheerio");
// const fs = require("fs");

// const session = axios.create({
//   baseURL: "https://bsestarmfdemo.bseindia.com",
//   withCredentials: true,
// });

// async function main() {
//   try {

//     const indexUrl = "/Index.aspx";
//     const responseIndex = await session.get(indexUrl);
//     const $index = cheerio.load(responseIndex.data);

//     const viewstateIndex = $index("#__VIEWSTATE").val();
//     const eventValidationIndex = $index("#__EVENTVALIDATION").val();
//     const viewstateGeneratorIndex = $index("#__VIEWSTATEGENERATOR").val();

//     // Step 2: Login form payload
//     const loginPayload = new URLSearchParams({
//       __VIEWSTATE: viewstateIndex,
//       __VIEWSTATEGENERATOR: viewstateGeneratorIndex,
//       __VIEWSTATEENCRYPTED: "",
//       __EVENTVALIDATION: eventValidationIndex,
//       txtUserId: "640501",
//       txtMemberId: "6405",
//       txtPassword: "Abc@12345",
//       btnLogin: "Login",
//       txtMobileNo: "",
//       txtOTP: "",
//     });

//     const loginUrl = "/Index.aspx";
//     const responseLogin = await session.post(loginUrl, loginPayload);

//     console.log(responseLogin.data);

//     const aofUrl = "/AOFDownload.aspx";
//     const responseAof = await session.get(aofUrl);
//     const $aof = cheerio.load(responseAof.data);

//     const viewstate = $aof("#__VIEWSTATE").val();
//     const eventValidation = $aof("#__EVENTVALIDATION").val();
//     const viewstateGenerator = $aof("#__VIEWSTATEGENERATOR").val();

//     // Download form data
//     const downloadData = new URLSearchParams({
//       __VIEWSTATE: viewstate,
//       __VIEWSTATEGENERATOR: viewstateGenerator,
//       __VIEWSTATEENCRYPTED: "",
//       __EVENTVALIDATION: eventValidation,
//       ddlDocType: "NormalAOF",
//       txtClientCode: "a0001",
//       btnDownload: "Download",
//     });

//     const responseDownload = await session.post(aofUrl, downloadData, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       responseType: "arraybuffer", // Required for handling binary PDF data
//     });

//     // Check if the response is a PDF and save it
//     if (
//       responseDownload.status === 200 &&
//       responseDownload.headers["content-type"] ===
//         "application/pdf; charset=utf-8"
//     ) {
//       fs.writeFileSync("AOF_6405_a0001.pdf", responseDownload.data);
//       console.log("PDF downloaded successfully.");
//     } else {
//       console.log("Failed to download PDF. Response content:");
//       console.log(responseDownload.data.toString());
//     }

//     console.log(`Status Code: ${responseDownload.status}`);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// main();

// const axios = require("axios");
// const cheerio = require("cheerio");
// const fs = require("fs");

// const session = axios.create({
//   baseURL: "https://bsestarmfdemo.bseindia.com",
//   withCredentials: true,
// });

// async function main() {
//   try {
//     // Step 1: Access the index page to retrieve initial view states and validations
//     const indexUrl = "/Index.aspx";
//     const responseIndex = await session.get(indexUrl);
//     const $index = cheerio.load(responseIndex.data);

//     const viewstateIndex = $index("#__VIEWSTATE").val();
//     const eventValidationIndex = $index("#__EVENTVALIDATION").val();
//     const viewstateGeneratorIndex = $index("#__VIEWSTATEGENERATOR").val();

//     // Step 2: Perform login
//     const loginPayload = new URLSearchParams({
//       __VIEWSTATE: viewstateIndex,
//       __VIEWSTATEGENERATOR: viewstateGeneratorIndex,
//       __VIEWSTATEENCRYPTED: "",
//       __EVENTVALIDATION: eventValidationIndex,
//       txtUserId: "640501", // replace with your actual User ID
//       txtMemberId: "6405", // replace with your actual Member ID
//       txtPassword: "Abc@12345", // replace with your actual password
//       btnLogin: "Login",
//       txtMobileNo: "",
//       txtOTP: "",
//     });

//     const loginUrl = "/Index.aspx";
//     await session.post(loginUrl, loginPayload);

//     // Step 3: Access AOF download page
//     const aofUrl = "/AOFDownload.aspx";
//     const responseAof = await session.get(aofUrl);
//     const $aof = cheerio.load(responseAof.data);
//     console.log("first", $aof.html());

//     const viewstate = $aof("#__VIEWSTATE").val();
//     const eventValidation = $aof("#__EVENTVALIDATION").val();
//     const viewstateGenerator = $aof("#__VIEWSTATEGENERATOR").val();

//     if (!viewstate || !eventValidation || !viewstateGenerator) {
//       throw new Error(
//         "ViewState or EventValidation is undefined. Check the page structure."
//       );
//     }

//     // Step 4: Prepare download form data
//     const downloadData = new URLSearchParams({
//       __EVENTTARGET: "",
//       __EVENTARGUMENT: "",
//       __LASTFOCUS: "",
//       __VIEWSTATE: viewstate,
//       __VIEWSTATEGENERATOR: viewstateGenerator,
//       __VIEWSTATEENCRYPTED: "",
//       __EVENTVALIDATION: eventValidation,
//       ddlDocType: "NormalAOF",
//       txtClientCode: "a0001", // replace with actual client code
//       btnDownload: "Download",
//       hdnNormal: "",
//       hdnRIA: "",
//       hdnIsCorp: "N",
//     });

//     // Step 5: Download AOF
//     const responseDownload = await session.post(aofUrl, downloadData, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/pdf",
//       },
//       responseType: "arraybuffer",
//     });

//     // Step 6: Save PDF if the response is valid
//     if (
//       responseDownload.status === 200 &&
//       responseDownload.headers["content-type"].includes("application/pdf")
//     ) {
//       fs.writeFileSync("AOF_6405_a0001.pdf", responseDownload.data);
//       console.log("PDF downloaded successfully.");
//     } else {
//       console.log("Failed to download PDF. Response content:");
//       console.log(responseDownload.data.toString());
//     }

//     console.log(`Status Code: ${responseDownload.status}`);
//   } catch (error) {
//     console.error("An error occurred:", error.message);
//   }
// }

// main();

// const axios = require("axios");
// const fs = require("fs");

// async function downloadAOF() {
//   const url = "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx";
//   const initialPageUrl = "https://bsestarmfdemo.bseindia.com/Index.aspx";

//   // Create an axios instance to manage cookies
//   const session = axios.create({
//     withCredentials: true,
//   });

//   // Step 1: Make an initial GET request to capture cookies
//   await session.get(initialPageUrl);

//   // The form data payload, dynamically capture __VIEWSTATE and __EVENTVALIDATION
//   const downloadData = new URLSearchParams({
//     __EVENTTARGET: "",
//     __EVENTARGUMENT: "",
//     __LASTFOCUS: "",
//     __VIEWSTATE:
//       "6dgXq9MgwTjJljiAhmjw4u8liKKolL5PfQBqaBVd2f3TmZImhX7AmnrfVyYvkFVV/qWEtoIvUTsa+MtXOw1/fqqnYcKes+ueI+RSx5LBa/jsY8pMTRg5nv9h6niLjbTWuVXjet+FqUt4YWQVt5Bfgpa4yVOz0BaGwNKsz7i/hdmrx5SGFxNCy1KwfkswmVCZtQMuYNfBwJhLXXLzdesLrTp0jYMjqFsRHqthBXcwJQ0pU7toGhRzK4RTdXvikZiHZaQF2cF4MxowwK7NrmZ5ytEUfSYJYCygSRXQ41bFr7BhSDxS",
//     __VIEWSTATEGENERATOR: "8DFDDDAB",
//     __VIEWSTATEENCRYPTED: "",
//     __EVENTVALIDATION:
//       "/y/Hp7dNTRcxVi27EH/fFDq4+c16XrpDKY/MXQgL5EOu2XdZ/uET3C6BE1J6P3JOkzuJlmyP9ggW3P7XYpFbd+uEGlE5VMuBjiRzv9l+oB0Zv0NXBTMs0+ucKHJsqgDY6ggvEMhz/Q2ftWCJM3rFVa05ovX3jBViehCl+eQ4HShSjsixDtNWH1dVXUFpqfTTt9r+QraOMoCFWEkGM96TlkYYGloJkcP2uONmUqRaBIgp68eZ9/TcIg/iINFcoJhYLcUWpBNrZGLaBCcI3YhCrPQa+XehurbSxnajcAqeGmWPVBFQ",
//     ddlDocType: "NormalAOF",
//     txtClientCode: "a0001",
//     btnDownload: "Download",
//     hdnNormal: "",
//     hdnRIA: "",
//     hdnIsCorp: "N",
//   });

//   try {
//     const responseDownload = await session.post(url, downloadData, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/pdf",
//         Referer: initialPageUrl,
//         Origin: initialPageUrl,
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
//       },
//       responseType: "arraybuffer", // Specify response type for binary data
//     });

//     // Check if response was successful
//     if (responseDownload.status === 200) {
//       // Create a buffer from the response data and write it to a file
//       fs.writeFileSync("AOF_Download.pdf", Buffer.from(responseDownload.data));
//       console.log("AOF PDF downloaded successfully.");
//     } else {
//       console.log("Failed to download AOF. Status:", responseDownload.status);
//     }
//   } catch (error) {
//     console.error("Error downloading AOF:", error);
//   }
// }

// downloadAOF();

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function downloadAOF() {
  const aofUrl = "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx";

  // Step 1: Create an axios instance for session management
  const session = axios.create({
    withCredentials: true, // Enable cookies
  });

  try {
    // Step 2: Send a GET request to the AOFDownload page
    const responseAOF = await session.get(aofUrl);

    // Step 3: Parse the response HTML to extract hidden fields
    const $ = cheerio.load(responseAOF.data);
    // const viewstate = $("input#__VIEWSTATE").val();
    // const eventValidation = $("input#__EVENTVALIDATION").val();
    // const viewstateGenerator = $("input#__VIEWSTATEGENERATOR").val();

    // Step 4: Prepare headers and data for the POST request
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/pdf",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      Referer: aofUrl,
      Origin: aofUrl,
    };

    const data = new URLSearchParams({
      __VIEWSTATE:
        "6dgXq9MgwTjJljiAhmjw4u8liKKolL5PfQBqaBVd2f3TmZImhX7AmnrfVyYvkFVV/qWEtoIvUTsa+MtXOw1/fqqnYcKes+ueI+RSx5LBa/jsY8pMTRg5nv9h6niLjbTWuVXjet+FqUt4YWQVt5Bfgpa4yVOz0BaGwNKsz7i/hdmrx5SGFxNCy1KwfkswmVCZtQMuYNfBwJhLXXLzdesLrTp0jYMjqFsRHqthBXcwJQ0pU7toGhRzK4RTdXvikZiHZaQF2cF4MxowwK7NrmZ5ytEUfSYJYCygSRXQ41bFr7BhSDxS",
      __VIEWSTATEGENERATOR: "8DFDDDAB",
      __VIEWSTATEENCRYPTED: "",
      __EVENTVALIDATION:
        "/y/Hp7dNTRcxVi27EH/fFDq4+c16XrpDKY/MXQgL5EOu2XdZ/uET3C6BE1J6P3JOkzuJlmyP9ggW3P7XYpFbd+uEGlE5VMuBjiRzv9l+oB0Zv0NXBTMs0+ucKHJsqgDY6ggvEMhz/Q2ftWCJM3rFVa05ovX3jBViehCl+eQ4HShSjsixDtNWH1dVXUFpqfTTt9r+QraOMoCFWEkGM96TlkYYGloJkcP2uONmUqRaBIgp68eZ9/TcIg/iINFcoJhYLcUWpBNrZGLaBCcI3YhCrPQa+XehurbSxnajcAqeGmWPVBFQ",
      ddlDocType: "NormalAOF",
      txtClientCode: "a0001",
      btnDownload: "Download",
    });

    // Step 5: Send the POST request to download the PDF
    const responsePost = await session.post(aofUrl, data, { headers });

    // Step 6: Check if the response is a PDF
    if (
      responsePost.status === 200 &&
      responsePost.headers["content-type"] === "application/pdf; charset=utf-8"
    ) {
      // Save the PDF file
      fs.writeFileSync("AOF_6405_a0001.pdf", responsePost.data);
      console.log("PDF downloaded successfully.");
    } else {
      console.log("Failed to download PDF. Response content:");
      console.log(responsePost.data);
    }

    console.log(`Status Code: ${responsePost.status}`);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
}

// Call the function to execute
downloadAOF();
