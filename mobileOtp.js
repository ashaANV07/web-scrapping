const axios = require("axios"); // Axios for HTTP requests

function sendSmsApi(mobileNo, sentMobileOtp) {
  // OTP message template
  const OTP_MESSAGE =
    "Dear User, Kindly signup on ArhamShare using this OTP - {sent_mobile_otp}. For security reasons, ensure you don't share your OTP with anyone ARHAM SHARE.";

  // Replace the OTP in the message
  const message = OTP_MESSAGE.replace(
    "{sent_mobile_otp}",
    String(sentMobileOtp)
  );

  // Static credentials and IDs for the SMS service
  const USERID = "arhamsec";
  const USERPASS = "ar7896";
  const GSMID = "ARHAMS";
  const PEID = "1101291470000028373";
  const TEMPID = "1107162332197430929"; // Default template ID

  // Construct the URL for sending the SMS
  const url = `https://onlysms.co.in/api/otp.aspx?UserID=${USERID}&UserPass=${USERPASS}&MobileNo=${mobileNo}&GSMID=${GSMID}&PEID=${PEID}&Message=${encodeURIComponent(
    message
  )}&TEMPID=${TEMPID}&UNICODE=TEXT`;

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
      throw error; 
    });
}

sendSmsApi("9898890296", "123456");
