const axios = require("axios");
const xml2js = require("xml2js");

// Helper functions
function validateDate(dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
}

async function kraVerification(pan_no, dob) {
    console.log('hello')
  try {
    const url = "https://pancheck.www.kracvl.com/CVLPanInquiry.svc";

    if (
      !/[A-Z]{5}[0-9]{4}[A-Z]/.test(pan_no.toUpperCase()) ||
      !validateDate(dob)
    ) {
      console.error("Invalid PAN or Date");
      return { status: 400, message: "Invalid PAN or Date of Birth" };
    }

    // Request Password SOAP Request
    const passwordPayload = `
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
                <GetPassword xmlns="https://pancheck.www.kracvl.com">
                    <webApi>
                        <password>ARHAM@111</password>
                        <passKey>W</passKey>
                    </webApi>
                </GetPassword>
            </Body>
        </Envelope>`;

    let headers = {
      "Content-Type": "text/xml",
      SOAPAction: "https://pancheck.www.kracvl.com/ICVLPanInquiry/GetPassword",
    };

    // Send password request
    let response = await axios.post(url, passwordPayload, { headers });
    console.log('first', response)

    if (response.status !== 200) {
      console.error("Service Unavailable");
      return { status: 503, message: "Service Unavailable" };
    }

    // Parse the response to extract the password
    let parsedPassword = await xml2js.parseStringPromise(response.data);
    let passk =
      parsedPassword["soap:Envelope"]["soap:Body"][0]["GetPasswordResponse"][0][
        "APP_GET_PASS"
      ][0];

    // KRA Status SOAP Request
    const statusPayload = `
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
                <GetPanStatus xmlns="https://pancheck.www.kracvl.com">
                    <webApi>
                        <pan>${pan_no.toUpperCase()}</pan>
                        <userName>ARHAMADMIN</userName>
                        <posCode>1200006405</posCode>
                        <password>${passk}</password>
                        <passKey>W</passKey>
                    </webApi>
                </GetPanStatus>
            </Body>
        </Envelope>`;

    headers = {
      "Content-Type": "text/xml",
      SOAPAction: "https://pancheck.www.kracvl.com/ICVLPanInquiry/GetPanStatus",
    };

    response = await axios.post(url, statusPayload, { headers });

    if (response.status !== 200) {
      console.error("Service Unavailable");
      return { status: 503, message: "Service Unavailable" };
    }

    // Parse the KRA status response
    let parsedStatus = await xml2js.parseStringPromise(response.data);
    let kraStatus =
      parsedStatus["soap:Envelope"]["soap:Body"][0]["GetPanStatusResponse"][0];

    // Log the entire KRA response to the console
    console.log("KRA Response: ", JSON.stringify(kraStatus, null, 2));

    return { status: 200, kraStatus: kraStatus };
  } catch (error) {
    console.error("Error processing KRA verification:", error);
    return {
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
}

// Example Usage:
kraVerification("NIVPS4943C", "12/12/1990")
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
