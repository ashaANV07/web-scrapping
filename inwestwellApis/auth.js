const axios = require("axios");

const handleLogin = async () => {
  try {
    const response = await axios.get(
      "https://demo.investwell.io/api/aggregator/auth/getAuthorizationToken",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.result.token;
    return token;
  } catch (error) {
    console.log("Authentication Error:", error);
  }
};

handleLogin();
