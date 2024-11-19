const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

async function loginToBseStarMF() {
  try {
    // Step 1: Initial GET Request to fetch Login Page
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

    if (!viewState || !eventValidation || !viewStateGenerator) {
      throw new Error("Failed to extract necessary tokens from login page.");
    }

    // Step 2: Login POST Request
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

    if (loginResponse.status !== 200) {
      throw new Error(`Login failed with status: ${loginResponse.status}`);
    }

    console.log("Login successful");

    const cookies = loginResponse.headers["set-cookie"].join("; ");

    // Step 3: Fetch AOF Download Page
    const downloadPageResponse = await axios.get(
      "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
          Cookie: cookies,
        },
      }
    );

    fs.writeFileSync("downloadPage.html", downloadPageResponse.data);
    console.log("Saved AOF download page HTML to downloadPage.html");

    const $download = cheerio.load(downloadPageResponse.data);

    const viewStateAof = $download("#__VIEWSTATE").val();
    const eventValidationAof = $download("#__EVENTVALIDATION").val();
    const viewStateGeneratorAof = $download("#__VIEWSTATEGENERATOR").val();

    if (!viewStateAof || !eventValidationAof || !viewStateGeneratorAof) {
      throw new Error(
        `Failed to extract tokens. 
          __VIEWSTATE: ${viewStateAof}, 
          __EVENTVALIDATION: ${eventValidationAof}, 
          __VIEWSTATEGENERATOR: ${viewStateGeneratorAof}`
      );
    }

    // Step 4: Download AOF PDF
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

    const downloadResponse = await axios.post(
      "https://bsestarmfdemo.bseindia.com/AOFDownload.aspx",
      new URLSearchParams(aofPayload),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
          Cookie: cookies,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        },
        responseType: "arraybuffer",
      }
    );

    if (downloadResponse.status === 200) {
      const contentType = downloadResponse.headers["content-type"];
      if (contentType === "application/pdf") {
        const filePath = path.join(__dirname, "AOF_6405_UCC0010.pdf");
        fs.writeFileSync(filePath, downloadResponse.data, {
          encoding: "binary",
        });
        console.log("PDF downloaded successfully to", filePath);
      } else {
        console.error("Unexpected content type:", contentType);
        fs.writeFileSync("response.html", downloadResponse.data);
        console.log(
          "Response saved to response.html for debugging. Check for errors."
        );
      }
    } else {
      throw new Error(
        `Failed to download PDF. Status: ${downloadResponse.status}`
      );
    }
  } catch (error) {
    console.error("Error during the process:", error.message);
  }
}

loginToBseStarMF();
