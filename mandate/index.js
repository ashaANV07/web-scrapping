const soap = require("soap");

const authUrl =
  "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc?wsdl";
const authParams = {
  UserId: "640501",
  Password: "Abc@12345",
  PassKey: "abcdef1234",
};

const options = {
  wsdl_headers: {
    "Content-Type": "application/soap+xml; charset=utf-8",
  },
  endpoint: authUrl,
};

soap.createClient(authUrl, options, (err, client) => {
  if (err) {
    console.error("Error creating SOAP client:", err);
    return;
  }

  client.getPassword(authParams, (err, result) => {
    if (err) {
      console.error("Error in getPassword:", err);
      return;
    }

    const responseCode = result.getPasswordResult.split("|")[0];
    const encryptedPassword = result.getPasswordResult.split("|")[1];

    if (responseCode === "100") {
      console.log(
        "Encrypted Password (Session ID) Generated:",
        encryptedPassword
      );

      mandateRegistration(encryptedPassword);
    } else {
      console.error("Authentication failed. Response:", result);
    }
  });
});

// client code: A0031, amount: 500, mandate_type: X, acc_no: 50100135485490, acc_type: SB, ifsc:HDFC0001249 micar:395240013
