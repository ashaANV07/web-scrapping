const axios = require("axios");

const getOrderPassword = async () => {
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/getPassword/640501/6405/Abc@12345/abcdef1234"
    );

    // Log the raw response data
    console.log("Raw Response Data:", response.data);

    // Extract the password by splitting the string
    const password = response.data.split("|")[1];
    console.log("Extracted Password:", password);

    return password; // Return only the password
  } catch (error) {
    // Enhanced error logging
    console.error("Error in Getare Order Password:", error.message);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
      console.error("Response Headers:", error.response.headers);
    }
  }
};

// Invoke the function
const main = async () => {
  const password = await getOrderPassword();
  console.log("Returned Password:", password);
};

main();

module.exports = getOrderPassword;
