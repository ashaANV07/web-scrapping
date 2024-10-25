const axios = require("axios");
const xml2js = require("xml2js");

async function authenticate() {
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/getPassword/640501/6405/Abc@12345/abcdef1234"
    );

    const encryptedPassword = response.data;
    console.log("encryptedPassword", encryptedPassword);
    return encryptedPassword;
  } catch (error) {
    console.error("Error authenticating:", error);
  }
}

const checkOrderStatus = async (encryptedPassword) => {
  const jsonRequestBody = {
    ClientCode: "A0001",
    Filler1: "",
    Filler2: "",
    Filler3: "",
    FromDate: "10/06/2002",
    MemberCode: "6405",
    OrderNo: "",
    OrderStatus: "All",
    OrderType: "All",
    Password: encryptedPassword, 
    SettType: "ALL",
    SubOrderType: "All",
    ToDate: "18/06/2024",
    TransType: "",
    UserId: "640501",
  };
  console.log('GFVXHFDVFHJDF')
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/OrderStatus",
      jsonRequestBody,
      {
        headers: {
          "Content-Type": "text/xml;charset=UTF-8",
        },
      }
    );
    console.log("response", response);
    const parsedResponse = await xml2js.parseStringPromise(response.data);
    console.log("Order Status Response:", parsedResponse);
  } catch (error) {
    console.log('Order Error:', error)
  }
};

(async () => {
  const encryptedPassword = await authenticate();
  if (encryptedPassword) {
    await checkOrderStatus(encryptedPassword);
  }
})();
