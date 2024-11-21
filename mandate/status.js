const axios = require("axios");

async function getAccessToken() {
  const url =
    "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/GetAccessToken";
  const requestBody = {
    RequestType: "MANDATE",
    UserId: "640501",
    MemberId: "6405",
    Password: "Abc@0707",
    PassKey: "abcdef1234",
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const AccessToken = response.data.ResponseString;
    return AccessToken;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
  }
}

async function getMandateStatus() {
  const url =
    "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/MandateDetails";

  const AccessToken = await getAccessToken();
  const body = {
    ClientCode: "A0031",
    EncryptedPassword: AccessToken,
    FromDate: "05/05/2022",
    MandateId: "877369",
    MemberCode: "6405",
    ToDate: "05/05/2025",
  };
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const MandateStatus = response.data.MandateDetails;
    console.log('MandateStatus', MandateStatus)
    return MandateStatus;
  } catch (error) {
    console.error(
      "Error fetching mandate status:",
      error.response?.data || error.message
    );
  }
}

getMandateStatus();
