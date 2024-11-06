// const axios = require("axios");

// const requestData = {
//   UserId: "640501",
//   MemberCode: "6405",
//   Password: "Abc@12345",
//   RegnType: "NEW",
//   Param:
//     "ucc0002|FirstName||LastName|01|M|01/01/1970|01|SI|||||||||||||N||||AFEPK2130F||||||||P||||||||SB|11415||HDFC0000001|Y|||||||||||||||||||||FirstNameLastName|01|ADD1|ADD2|ADD3|MUMBAI|MA|400001|INDIA|22721233||||test@test.com|P||||||||||||9999999999|NomineeName1|01|100|N|||||||||||||||K||||||||||||N||P|||SE|SE|Y|O||||||||||||||||||",
//   Filler1: "",
//   Filler2: "",
// };

// const apiURL =
//   "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/UCCAPI/UCCRegistration";

// async function registerUCC() {
//   try {
//     const response = await axios.post(apiURL, requestData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("Response:", response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error("Error:", error.response.data);
//     } else {
//       console.error("Error:", error.message);
//     }
//   }
// }

// registerUCC();

const axios = require("axios");

const buildParamString = ({
  ucc,
  firstName,
  middleName = "",
  lastName,
  taxStatus,
  gender,
  dob,
  occupationCode,
  holdingNature,
  panExempt = "N",
  primaryPAN,
  secondHolderFirstName = "",
  secondHolderMiddleName = "",
  secondHolderLastName = "",
  thirdHolderFirstName = "",
  thirdHolderMiddleName = "",
  thirdHolderLastName = "",
  accountType1,
  accountNo1,
  ifscCode1,
  defaultBankFlag1 = "Y",
  nomineeName = "",
  nomineeRelation = "22",
  nomineePercentage = "100",
  nomineeMinorFlag = "N",
  nomineeDOB = "",
  nomineeGuardian = "",
  communicationMode = "P",
  email = "",
  phone = "",
  address1 = "",
  address2 = "",
  address3 = "",
  city = "",
  state = "",
  pincode = "",
  country = "INDIA",
  kycType = "K",
  ckycNumber = "",
  aadhaarUpdated = "N",
}) => {
  return `${ucc}|${firstName}|${middleName}|${lastName}|${taxStatus}|${gender}|${dob}|${occupationCode}|${holdingNature}|${secondHolderFirstName}|${secondHolderMiddleName}|${secondHolderLastName}|${thirdHolderFirstName}|${thirdHolderMiddleName}|${thirdHolderLastName}|${panExempt}|${primaryPAN}|||||${accountType1}|${accountNo1}||${ifscCode1}|${defaultBankFlag1}|${phone}|||||||||||||${firstName}${lastName}|${taxStatus}|${address1}|${address2}|${address3}|${city}|${state}|${pincode}|${country}|${phone}||||${email}|${communicationMode}||||||||||||${phone}|${nomineeName}|${nomineeRelation}|${nomineePercentage}|${nomineeMinorFlag}|${nomineeDOB}|${nomineeGuardian}|||||||||||||${kycType}|${ckycNumber}|||N||P|||SE|SE|${aadhaarUpdated}|O||||||||||||||||||`;
};

const requestData = ({
  ucc,
  firstName,
  middleName,
  lastName,
  taxStatus,
  gender,
  dob,
  occupationCode,
  holdingNature,
  primaryPAN,
  secondHolderFirstName,
  secondHolderMiddleName,
  secondHolderLastName,
  thirdHolderFirstName,
  thirdHolderMiddleName,
  thirdHolderLastName,
  accountType1,
  accountNo1,
  ifscCode1,
  email,
  phone,
  address1,
  city,
  state,
  pincode,
  country,
  kycType,
  ckycNumber,
  aadhaarUpdated,
}) => ({
  UserId: "640501",
  MemberCode: "6405",
  Password: "Abc@12345",
  RegnType: "NEW",
  Param: buildParamString({
    ucc,
    firstName,
    middleName,
    lastName,
    taxStatus,
    gender,
    dob,
    occupationCode,
    holdingNature,
    primaryPAN,
    secondHolderFirstName,
    secondHolderMiddleName,
    secondHolderLastName,
    thirdHolderFirstName,
    thirdHolderMiddleName,
    thirdHolderLastName,
    accountType1,
    accountNo1,
    ifscCode1,
    email,
    phone,
    address1,
    city,
    state,
    pincode,
    country,
    kycType,
    ckycNumber,
    aadhaarUpdated,
  }),
  Filler1: "",
  Filler2: "",
});

const apiURL =
  "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/UCCAPI/UCCRegistration";

async function registerUCC(userInput) {
  const data = requestData(userInput);

  console.log("Generated Param string:", data.Param);

  try {
    const response = await axios.post(apiURL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

registerUCC({
  ucc: "ucc0002",
  firstName: "Asha",
  middleName: "",
  lastName: "Chaudhari",
  taxStatus: "01",
  gender: "F",
  dob: "01/01/1980",
  occupationCode: "01",
  holdingNature: "SI",
  primaryPAN: "ABCDE1234F",
  secondHolderFirstName: "",
  secondHolderMiddleName: "",
  secondHolderLastName: "",
  thirdHolderFirstName: "",
  thirdHolderMiddleName: "",
  thirdHolderLastName: "",
  accountType1: "SB",
  accountNo1: "1141500001",
  ifscCode1: "HDFC0000001",
  email: "john.doe@test.com",
  phone: "9999999999",
  address1: "123 Main St",
  city: "Mumbai",
  state: "MA",
  pincode: "400001",
  country: "INDIA",
  kycType: "K",
  ckycNumber: "",
  aadhaarUpdated: "Y",
});
