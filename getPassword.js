const axios = require("axios");
const xml2js = require("xml2js");

const getPassword = async () => {
  console.log('first')
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
            <wsa:Action>http://bsestarmf.in/MFOrderEntry/getPassword</wsa:Action>
            <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
        </soap:Header>
        <soap:Body>
            <bses:getPassword>
                <bses:UserId>640501</bses:UserId>
                <bses:Password>Abc@12345</bses:Password>
                <bses:PassKey>abcdef1234</bses:PassKey>
            </bses:getPassword>
        </soap:Body>
    </soap:Envelope>`;

  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure",
      soapRequest,
      {
        headers: {
          "Content-Type": "application/soap+xml;charset=UTF-8",
          Accept: "text/xml",
        },
      }
    );

    const result = await xml2js.parseStringPromise(response.data);
    console.log("Response:", JSON.stringify(result, null, 2));

    const passwordResult =
      result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
        "getPasswordResult"
      ][0];
    console.log("Password Result:", passwordResult);
  } catch (error) {
    console.error("Error:", error);
  }
};

getPassword();
// module.exports = getPassword;
