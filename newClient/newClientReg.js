const axios = require("axios");

const registerNewClient = async () => {
  try {
    const url =
      "https://bsestarmfdemo.bseindia.com/StarMFCommonAPI/ClientMaster/Registration";

    // // Mandatory Fields
    // const clientCode = "A0031";
    // const firstName = "Mitva";
    // const middleName = "";
    // const lastName = "Shah";
    // const taxStatus = "01";
    // const gender = "F";
    // const dob = "07/07/2003";
    // const occupation = "01";
    // const holdingNature = "SI";
    // const pan = "AFEPK2130F";
    // const accountType = "SB";
    // const mobileNo = "9876543210";

    // const address1 = "123 Main Street";
    // const address2 = "";
    // const address3 = "";
    // const city = "Mumbai";
    // const stateCode = "MH";
    // const postalCode = "400001";
    // const country = "IND";

    // const bankCode = "HDFC0000001";
    // const bankAccountNo = "11415";
    // const bankAccountType = "SB";

    // const param = [
    //   clientCode,
    //   firstName,
    //   middleName,
    //   lastName,
    //   taxStatus,
    //   gender,
    //   dob,
    //   occupation,
    //   holdingNature,
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "N",
    //   "",
    //   "",
    //   pan,
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "P",
    //   "",
    //   "",
    //   bankAccountType,
    //   bankAccountNo,
    //   "",
    //   bankCode,
    //   "Y",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   `${firstName} ${lastName}`,
    //   "01",
    //   address1,
    //   address2,
    //   address3,
    //   city,
    //   stateCode,
    //   postalCode,
    //   country,
    //   "02212345678",
    //   "",
    //   "",
    //   "",
    //   "johndoe@example.com",
    //   "P",
    //   "",
    //   "",
    //   "",
    //   "",
    //   mobileNo,
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "K",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "N",
    //   "",
    //   "P",
    //   "",
    //   "",
    //   "SE",
    //   "SE",
    // ].join("|");
    // console.log('first', param)

    const param = "T0001|FirstName||LastName|01|M|01/01/1970|01|SI|||||||||||||N||||AFEPK2130F||||||||P||||||||SB|11415||HDFC0000001|Y|||||||||||||||||||||FirstName LastName|01|ADD 1|ADD 2|ADD 3|MUMBAI|MA|400001|INDIA|22721233||||test@test.com|P||||||||||||9999999999|||||||||||||||||||K||||||||||||N||P|||SE|SE|";

    const data = {
      UserId: "640501",
      MemberCode: "6405",
      Password: "Abc@12345",
      RegnType: "NEW",
      Param: param,
      Filler1: "",
      Filler2: "",
    };

    const response = await axios.post(url, data);
    console.log("Registration Response:", response.data);
  } catch (error) {
    console.error("Error in registration:", error);
  }
};

registerNewClient();
