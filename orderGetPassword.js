const axios = require("axios");
const xml2js = require("xml2js");

const getOrderPassword = async () => {
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/getPassword/640501/6405/Abc@12345/abcdef1234"
    );

    const result = await xml2js.parseStringPromise(response.data);
    console.log("Response:", JSON.stringify(result, null, 2));

    const passwordResult =
      result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
        "getPasswordResult"
      ][0];
    console.log("Password Result:", passwordResult);
  } catch (error) {
    console.log("Error in Getare Order Password:", error);
  }
};

getOrderPassword();
