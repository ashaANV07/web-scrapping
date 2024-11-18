const soap = require("soap");

// WSDL URLs
const authWsdl =
  "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc?singleWsdl";
const mandateStatusWsdl =
  "https://bsestarmfdemo.bseindia.com/MandateStatus/MandateStatus.svc?singleWsdl";

// Authentication Parameters
const authParams = {
  UserId: "640501",
  Password: "Abc@12345",
  PassKey: "Abcd@123",
};

// Request Mandate Status
async function getMandateStatus() {
  try {
    // Authenticate
    const authClient = await soap.createClientAsync(authWsdl);
    const authResponse = await authClient.getPasswordAsync(authParams);
    const encryptedPassword = authResponse[0]?.getPasswordResult.split("|")[1];

    if (!encryptedPassword) {
      console.error("Authentication failed.");
      return;
    }

    console.log("Authenticated successfully.");

    // Mandate Status Parameters
    const mandateParams = {
      UserId: authParams.UserId,
      MemberId: "6405",
      EncryptedPassword: encryptedPassword,
      UniqueRefNo: "uniqueRef123", // Customize as needed
      MandateID: "yourMandateId",
    };

    // Mandate Status Request
    const statusClient = await soap.createClientAsync(mandateStatusWsdl);
    const statusResponse = await statusClient.MandateStatusAsync(mandateParams);

    console.log("Mandate Status Response:", statusResponse);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

getMandateStatus();
