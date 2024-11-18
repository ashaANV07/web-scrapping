const soap = require("soap");
const url =
  "https://bsestarmfdemo.bseindia.com/StarMFFileUploadService/StarMFFileUploadService.svc?wsdl";

// Replace with your actual credentials
const memberCode = "6405";
const password = "Abc@12345";

// Function to login and get session token
function login() {
  const args = {
    MemberCode: memberCode,
    Password: password,
  };

  return new Promise((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        reject("Error creating SOAP client: " + err);
        return;
      }

      client.Login(args, function (err, result) {
        if (err) {
          reject("Error in login request: " + err);
        } else {
          resolve(result.SessionToken);
        }
      });
    });
  });
}

// Function to fetch NAV details using scheme code
function getNavDetails(sessionToken, schemeCode) {
  const args = {
    SchemeCode: schemeCode,
    SessionToken: sessionToken,
  };

  return new Promise((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        reject("Error creating SOAP client: " + err);
        return;
      }

      client.GetNAVDetails(args, function (err, result) {
        if (err) {
          reject("Error fetching NAV details: " + err);
        } else {
          resolve(result.GetNAVDetailsResponse);
        }
      });
    });
  });
}

// Main function to authenticate, get session token, and fetch NAV data
async function fetchMutualFundData() {
  try {
    // Step 1: Login and get session token
    const sessionToken = await login();
    console.log("Authenticated successfully, session token:", sessionToken);

    // Step 2: Fetch NAV details for a specific scheme
    const schemeCode = "123456"; // Replace with the actual scheme code
    const navData = await getNavDetails(sessionToken, schemeCode);

    // Step 3: Output the NAV details
    console.log("NAV Data:", navData);
    console.log("Scheme Code:", navData.SchemeCode);
    console.log("Scheme Name:", navData.SchemeName);
    console.log("ISIN:", navData.ISIN);
    console.log("NAV Value:", navData.NAVValue);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the main function to get mutual fund data
fetchMutualFundData();
