const axios = require("axios");
const xml2js = require("xml2js");

// Replace these values with your actual credentials
const userId = "640501";
const password = "Abc@12345";
const passKey = "randomPassKey123";

// SOAP request template
const soapRequest = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
  <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <wsa:Action>http://bsestarmf.in/MFOrderEntry/getPassword</wsa:Action>
    <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
  </soap:Header>
  <soap:Body>
    <bses:getPassword>
      <bses:UserId>${userId}</bses:UserId>
      <bses:Password>${password}</bses:Password>
      <bses:PassKey>${passKey}</bses:PassKey>
    </bses:getPassword>
  </soap:Body>
</soap:Envelope>`;

// Make the SOAP request
(async () => {
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure",
      soapRequest,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://bsestarmf.in/MFOrderEntry/getPassword",
        },
      }
    );

    // Parse the XML response
    xml2js.parseString(
      response.data,
      { explicitArray: false },
      (err, result) => {
        if (err) {
          console.error("Error parsing response:", err);
          return;
        }

        // Extract the response
        const resultString =
          result["soap:Envelope"]["soap:Body"]["getPasswordResponse"][
            "getPasswordResult"
          ];
        const [responseCode, sessionId] = resultString.split("|");

        if (responseCode === "100") {
          console.log("Login successful. Encrypted Session ID:", sessionId);
          // You can use this session ID for further requests
        } else {
          console.log("Login failed. Response:", resultString);
        }
      }
    );
  } catch (error) {
    console.error("Error during SOAP request:", error.message);
  }
})();
