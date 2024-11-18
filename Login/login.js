// const axios = require("axios");
// const cheerio = require("cheerio");

// async function fetchHiddenFields() {
//   try {
//     // Fetch the page
//     const response = await axios.get(
//       "https://bsestarmfdemo.bseindia.com/Index.aspx"
//     );

//     // Load the HTML into cheerio
//     const $ = cheerio.load(response.data);

//     // Extract the values of the hidden fields
//     const viewState = $("#__VIEWSTATE").val();
//     const eventValidation = $("#__EVENTVALIDATION").val();
//     const viewStateGenerator = $("#__VIEWSTATEGENERATOR").val();

//     // Log the results
//     console.log("VIEWSTATE:", viewState);
//     console.log("EVENTVALIDATION:", eventValidation);
//     console.log("VIEWSTATEGENERATOR:", viewStateGenerator);

//     return { viewState, eventValidation, viewStateGenerator };
//   } catch (error) {
//     console.error("Error fetching hidden fields:", error);
//   }
// }

// // Call the function
// fetchHiddenFields();

// const axios = require("axios");
// const cheerio = require("cheerio");

// async function loginToBseStarMF() {
//   try {
//     // Step 1: Get the login page and extract hidden fields
//     const response = await axios.get(
//       "https://bsestarmfdemo.bseindia.com/Index.aspx",
//       {
//         headers: {
//           "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
//         },
//       }
//     );

//     const $ = cheerio.load(response.data);

//     const viewState = $("#__VIEWSTATE").val();
//     const eventValidation = $("#__EVENTVALIDATION").val();
//     const viewStateGenerator = $("#__VIEWSTATEGENERATOR").val();

//     // Step 2: Prepare the payload for login
//     const payload = {
//       __LASTFOCUS: "",
//       ToolkitScriptManager1_HiddenField:
//         ";;AjaxControlToolkit, Version=3.0.20820.16598, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e:en-US:707835dd-fa4b-41d1-89e7-6df5d518ffb5:411fea1c:865923e8:77c58d20:91bd373d:14b56adc:596d588c:8e72a662:acd642d2:269a19ae",
//       __EVENTTARGET: "",
//       __EVENTARGUMENT: "",
//       __VIEWSTATE: viewState,
//       __VIEWSTATEGENERATOR: viewStateGenerator,
//       __VIEWSTATEENCRYPTED: "",
//       __EVENTVALIDATION: eventValidation,
//     //   savepassword: "euTCW7YDZL5vC2rFWFLp1g==",
//     //   saveusername: "zUlKK83jY7SEGLnKhC//hA==",
//     //   savememberid: "anQvsnaxKIOsMFgmESfmvA==",
//       txtUserId: "640501",
//       txtMemberId: "6405",
//       txtPassword: "Abc@12345",
//     //   txtCaptcha: "I74yg", // Replace with dynamic CAPTCHA if needed
//       btnLogin: "Login",
//       txtMobileNo: "",
//       txtOTP: "",
//     };

//     // Step 3: Send the POST request to log in
//     const loginResponse = await axios.post(
//       "https://bsestarmfdemo.bseindia.com/Index.aspx",
//       new URLSearchParams(payload),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
//         },
//       }
//     );

//     if (loginResponse.status === 200) {
//       console.log("Login successful");
//       // Check for redirection or session validation
//       console.log(loginResponse.data); // Handle the response as needed
//     } else {
//       console.error("Login failed with status:", loginResponse.status);
//     }
//   } catch (error) {
//     console.error("Error during login process:", error.message);
//   }
// }

// // Execute the function
// loginToBseStarMF();

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

async function loginToBseStarMF() {
  try {
    // Step 1: Get the login page and extract hidden fields
    const response = await axios.get(
      "https://bsestarmfdemo.bseindia.com/Index.aspx",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        },
      }
    );

    const $ = cheerio.load(response.data);

    const viewState = $("#__VIEWSTATE").val();
    const eventValidation = $("#__EVENTVALIDATION").val();
    const viewStateGenerator = $("#__VIEWSTATEGENERATOR").val();

    // Step 2: Prepare the payload for login
    const payload = {
      __LASTFOCUS: "",
      ToolkitScriptManager1_HiddenField:
        ";;AjaxControlToolkit, Version=3.0.20820.16598, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e:en-US:707835dd-fa4b-41d1-89e7-6df5d518ffb5:411fea1c:865923e8:77c58d20:91bd373d:14b56adc:596d588c:8e72a662:acd642d2:269a19ae",
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATE: viewState,
      __VIEWSTATEGENERATOR: viewStateGenerator,
      __VIEWSTATEENCRYPTED: "",
      __EVENTVALIDATION: eventValidation,
      txtUserId: "640501",
      txtMemberId: "6405",
      txtPassword: "Abc@12345",
      btnLogin: "Login",
    };

    // Step 3: Send the POST request to log in
    const loginResponse = await axios.post(
      "https://bsestarmfdemo.bseindia.com/Index.aspx",
      new URLSearchParams(payload),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        },
      }
    );

    if (loginResponse.status === 200) {
      console.log("Login successful");

      // Step 4: Get the AOFDownload page to extract more hidden fields
      const downloadPageResponse = await axios.get(
        "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
            Cookie: loginResponse.headers["set-cookie"].join("; "), // Include the cookies from the login session
          },
        }
      );

      const $download = cheerio.load(downloadPageResponse.data);

      const viewStateAof = $download("#__VIEWSTATE").val();
      const eventValidationAof = $download("#__EVENTVALIDATION").val();
      const viewStateGeneratorAof = $download("#__VIEWSTATEGENERATOR").val();

      // Step 5: Prepare the payload for the AOF download
      const aofPayload = {
        __LASTFOCUS: "",
        __EVENTTARGET: "",
        __EVENTARGUMENT: "",
        __VIEWSTATE: viewStateAof,
        __VIEWSTATEGENERATOR: viewStateGeneratorAof,
        __VIEWSTATEENCRYPTED: "",
        __EVENTVALIDATION: eventValidationAof,
        ddlDocType: "NormalAOF",
        txtClientCode: "UCC0010",
        btnDownload: "Download",
        hdnNormal: "",
        hdnRIA: "",
        hdnIsCorp: "N",
      };

      // Step 6: Send the POST request to download the PDF
      const downloadResponse = await axios.post(
        "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
        new URLSearchParams(aofPayload),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
            Cookie: loginResponse.headers["set-cookie"].join("; "), // Include cookies
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          },
          responseType: "arraybuffer", // Handle PDF as binary data
        }
      );

      // Step 7: Save the PDF file to disk
      if (downloadResponse.status === 200) {
        const filePath = path.join(__dirname, "AOF_6405_UCC0010.pdf");
        fs.writeFileSync(filePath, downloadResponse.data);
        console.log("PDF downloaded successfully to", filePath);
      } else {
        console.error(
          "Failed to download PDF. Status:",
          downloadResponse.status
        );
      }
    } else {
      console.error("Login failed with status:", loginResponse.status);
    }
  } catch (error) {
    console.error("Error during the process:", error.message);
  }
}

// Execute the function
loginToBseStarMF();
