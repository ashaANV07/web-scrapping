const axios = require("axios");

const registerNewClient = async () => {
  try {
    const url =
      "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/UCCAPI/UCCRegistration";

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

    const param =
      "A0666|BHARGAVIBEN|BHARGAVIBEN|PATEL|01|F|11/01/1994|06|SI|||||||||||||N||||CYVPP0404J||||||||D|N|CDSL|12071700|00113162|||||||||SB|442702010021817||UBIN0544272|N|SB|50100275796812||HDFC0001249|N|SB|36526015334||SBIN0071208|Y|||||||02|1668, PATEL SOCIETY|||NAVSARI|GU|396475|INDIA|8780171841||||ashiichaudhary07@gmail.com|E||||||||||||9898890296|RAKESH NANUBHAI PATEL| |100|N|||||||||||||||K||||||||||||||Z|||SE|SE|Y|O||||||||||||||";

    const data = {
      UserId: "640501",
      MemberCode: "6405",
      Password: "Abc@0707",
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
