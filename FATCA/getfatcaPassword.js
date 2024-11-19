const axios = require("axios");
console.log("first");

const xml = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
                xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">
              <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/getPassword</wsa:Action>
                <wsa:To>https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure</wsa:To>
              </soap:Header>
              <soap:Body>
                <ns:getPassword>
                  <ns:UserId>640501</ns:UserId>
                  <ns:MemberId>6405</ns:MemberId>
                  <ns:Password>Abc@0707</ns:Password>
                  <ns:PassKey>Abcd@123</ns:PassKey>
                </ns:getPassword>
              </soap:Body>
            </soap:Envelope>`;

async function getPassword() {
  console.log("Fetching password...");
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure",
      xml,
      {
        headers: {
          "Content-Type": "application/soap+xml;charset=UTF-8",
          SOAPAction:
            "http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/getPassword",
        },
      }
    );

    const data = response.data;
    console.log("Raw response data:", data);

    if (data.includes("<getPasswordResult>")) {
      // Extract the entire getPasswordResult content
      const result = data
        .split("<getPasswordResult>")[1]
        .split("</getPasswordResult>")[0];

      // Extract the part after "100|"
      const encryptedPassword = result.split("|")[1];
      console.log("Extracted Password:", encryptedPassword);
      return encryptedPassword;
    } else {
      throw new Error("getPasswordResult tag not found in response.");
    }
  } catch (error) {
    console.error("Error fetching password:", error.message);
    if (error.response) {
      console.error("Response error:", error.response.data);
    }
  }
}

getPassword();

module.exports = getPassword;
