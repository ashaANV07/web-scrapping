const axios = require("axios");

// Configuration
const baseUrl =
  "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc";
const userId = "640501"; // Replace with your User ID
const memberId = "6405"; // Replace with your Member ID
const password = "Abc@0707"; // Replace with your Password
const passKey = "abcdef1234"; // Replace with your PassKey

async function fetchEncryptedPassword() {
  const url = `${baseUrl}/getPassword/${userId}/${memberId}/${password}/${passKey}`;

  try {
    const response = await axios.post(url);

    // API returns response as 'ResponseCode|EncryptedPassword'
    const [responseCode, encryptedPassword] = response.data.split("|");

    if (responseCode === "100") {
      console.log("Authentication Successful");
      console.log("Encrypted Password:", encryptedPassword);
      return encryptedPassword;
    } else {
      console.error("Authentication Failed. Response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching password:", error.message);
  }
}

// Call the function
// fetchEncryptedPassword();

const orderStatus = async () => {
  const encryptedPassword = await fetchEncryptedPassword();
  // if (encryptedPassword) {
  //     await checkOrderStatus(encryptedPassword);
  // }

  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/OrderStatus",
      {
        ClientCode: "A2870",
        Filler1: "",
        Filler2: "",
        Filler3: "",
        FromDate: "10/06/2002",
        MemberCode: "6405",
        OrderNo: "",
        OrderStatus: "All",
        OrderType: "All",
        Password: "Abc@0707",
        SettType: "ALL",
        SubOrderType: "All",
        ToDate: "19/11/2024",
        TransType: "",
        UserId: "640501",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
