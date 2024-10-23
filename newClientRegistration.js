const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

const dpDetails = async (clientCode = "MM399") => {
  try {
    const currentYear = moment().year();
    const nextYear = currentYear + 1;

    const urlKYC = `http://192.168.102.101:8080/techexcelapi/index.cfm/DP_CLIENT_DATA_LIST/DP_CLIENT_DATA_LIST1?.&Client_id=${clientCode}&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo${currentYear}&UrlDataYear=${currentYear}&FROM_DATE=30/04/2002&TO_DATE=30/04/${nextYear}&BO_ID=&DataBaseName=`;

    const response = await axios.get(urlKYC);
    const jesonResult = response.data;
    const data = jesonResult[0].DATA;

    const boId = data[0][134];
    const dpId = data[0][137];
    const fullGuardianName = data[0][122].split(" ");

    const guardianFirstName =
      fullGuardianName.length > 1 ? fullGuardianName[0] : "";
    const guardianLastName =
      fullGuardianName.length > 1
        ? fullGuardianName[fullGuardianName.length - 1]
        : "";
    const guardianDOB = "31/07/2016";
    const guardianPAN = data[0][124];

    const secondHolderName = data[0][163].split(" ");
    const secondHolderFirstName =
      secondHolderName.length > 1 ? secondHolderName[0] : "";
    const secondHolderLastName =
      secondHolderName.length > 1 ? secondHolderName[1] : "";
    const secondHolderPAN = data[0][203];

    const thirdHolderName = data[0][162].split(" ");
    const thirdHolderFirstName =
      thirdHolderName.length > 1 ? thirdHolderName[0] : "";
    const thirdHolderLastName =
      thirdHolderName.length > 1 ? thirdHolderName[1] : "";
    const thirdHolderPAN = data[0][204];

    const holdingType =
      1 + (secondHolderFirstName ? 1 : 0) + (thirdHolderFirstName ? 1 : 0);
    const holdingNature = holdingType === 1 ? "SI" : "JO";

    return {
      holdingNature,
      secondHolderFirstName,
      secondHolderLastName,
      thirdHolderFirstName,
      thirdHolderLastName,
      guardianFirstName,
      guardianLastName,
      guardianDOB,
      primaryHolderPANExempt: "N",
      secondHolderPANExempt: "",
      thirdHolderPANExempt: "",
      guardianPANExempt: "",
      secondHolderPAN,
      thirdHolderPAN,
      guardianPAN,
      dpId,
      CDSLCLTID: boId.slice(-8),
    };
  } catch (error) {
    console.log("DP Details Error:", error);
  }
};

const bankDeatils = async (clientCode = "MM399") => {
  try {
    const currentYear = moment().year();
    const urlKYC = `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientBankDetailMultiple/ClientBankDetailMultiple1?&Client_id=${clientCode}&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${currentYear}`;

    const response = await axios.get(urlKYC);
    // console.log('response', response)
    const data = response.data[0].DATA;
    console.log("bank details", data);

    const columnsToKeep = [
      "client_id",
      "ifsc_code",
      "holder_name",
      "acc_number",
      "bank_name",
      "branch_name",
      "acc_type",
      "default_ac",
    ];

    const indicesToKeep = [0, 4, 11, 12, 16, 17, 22, 18];

    const bankLists = data.map((bank) => {
      const result = {};
      indicesToKeep.forEach((index, idx) => {
        result[columnsToKeep[idx]] = bank[index];
      });
      return result;
    });

    console.log("bank details data", bankLists);
    const accountTypes = {};
    bankLists.forEach((bank, index) => {
      const bankCount = index + 1;
      accountTypes[bankCount] = {
        [`Account_type_${bankCount}`]:
          bank.acc_type === "Saving"
            ? "SB"
            : bank.acc_type === "Current"
            ? "CB"
            : bank.acc_type === "NRE"
            ? "NE"
            : bank.acc_type === "NRo"
            ? "NO"
            : "",
        [`bank_def_${bankCount}`]: bank.default_ac === "Yes" ? "Y" : "N",
        [`Account_No_${bankCount}`]: bank.acc_number,
        [`MICR_No_${bankCount}`]: "",
        [`IFSC_Code_${bankCount}`]: bank.acc_type,
      };
    });

    return accountTypes;
  } catch (error) {
    console.error("Bank Details Error: ", error);
  }
};

const userCreationSchema = async (clientCode = "MM399") => {
  try {
    const currentYear = moment().year();
    const url = `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientList/ClientList?&CLIENT_ID=${clientCode.toUpperCase()}&FROM_DATE=&TO_DATE=&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${currentYear}`;

    const response = await axios.get(url);
    const data = response.data[0].DATA;

    const clientName = data[0][569].split(" ");
    const clientFirstName = clientName[0];
    const clientLastName = clientName[clientName.length - 1];

    const taxStatus = "01";
    const gender = data[0][34];
    const dateOfIncorp = data[0][179];
    const DOB = dateOfIncorp ? dateOfIncorp : data[0][241];

    const occupations = {
      Business: "01",
      Services: "02",
      Professional: "03",
      Agriculture: "04",
      Retired: "05",
      Housewife: "06",
      Student: "07",
      Others: "08",
    };
    const occupation = occupations[data[0][430]] || "01";

    const dpData = await dpDetails(clientCode);
    const primaryHolderPAN = data[0][189];

    const bankData = await bankDeatils(clientCode);

    const accountDetails = [];
    for (let i = 1; i <= 3; i++) {
      if (bankData[i]) {
        accountDetails.push(bankData[i]);
      }
    }

    return {
      clientFirstName,
      clientLastName,
      taxStatus,
      gender,
      DOB,
      occupation,
      dpData,
      primaryHolderPAN,
      accountDetails,
    };
  } catch (error) {
    console.log("User Creation Schema Error:", error);
  }
};

const registerClient = async (payload) => {
  console.log("payload", payload);
  const url =
    "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/api/ClientRegistration/Registration";

  const payload1 = {
    UserId: "640501",
    MemberCode: "6405",
    Password: "Abc@12345",
    RegnType: "MOD",
    Param: payload,
    Filler1: "",
    Filler2: "",
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, payload1, { headers });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

const main = async () => {
  const userDetails = await userCreationSchema("MM399");
  console.log("User Details:", userDetails);

  if (userDetails) {
    const registrationResponse = await registerClient(userDetails);
    console.log("Registration Response:", registrationResponse);
  }
};

(async () => {
  await main();
})();
