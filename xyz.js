const axios = require("axios");
const moment = require("moment");

// State abbreviations
const STATE_ABBR = {
  "Andaman & Nicobar Islands": "AN",
  "Arunachal Pradesh": "AR",
  "Andhra Pradesh": "AP",
  Assam: "AS",
  Bihar: "BR",
  Chandigarh: "CH",
  Chhattisgarh: "CG",
  Goa: "GA",
  Gujarat: "GU",
  Haryana: "HA",
  "Himachal Pradesh": "HP",
  "Jammu & Kashmir": "JK",
  Jharkhand: "JH",
  Karnataka: "KA",
  Kerala: "KE",
  "Madhya Pradesh": "MP",
  Maharashtra: "MA",
  Manipur: "MN",
  Meghalaya: "ME",
  Mizoram: "MI",
  Nagaland: "NA",
  "New Delhi": "ND",
  Odisha: "OR",
  Pondicherry: "PO",
  Punjab: "PU",
  Rajasthan: "RA",
  Sikkim: "SI",
  Telangana: "TG",
  "Tamil Nadu": "TN",
  Tripura: "TR",
  "Uttar Pradesh": "UP",
  Uttaranchal: "UC",
  "West Bengal": "WB",
  "Dadra and Nagar Haveli": "DN",
  "Daman and Diu": "DD",
  Lakshadweep: "LD",
  Others: "OH",
};

const BASE_URL = "http://192.168.102.101:8080/techexcelapi/index.cfm";
const USERNAME = "techapi";
const PASSWORD = "techapi@123";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
};

const parseFullName = (name) => {
  const parts = name.split(" ");
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return [firstName, lastName];
};

const dpDetails = async (clientCode = "MM399") => {
  try {
    const currentYear = moment().year();
    const nextYear = currentYear + 1;

    const url = `${BASE_URL}/DP_CLIENT_DATA_LIST/DP_CLIENT_DATA_LIST1?.&Client_id=${clientCode}&UrlUserName=${USERNAME}&UrlPassword=${PASSWORD}&UrlDatabase=capsfo${currentYear}&UrlDataYear=${currentYear}&FROM_DATE=30/04/2002&TO_DATE=30/04/${nextYear}&BO_ID=&DataBaseName=`;

    const jsonResult = await fetchData(url);
    if (!jsonResult || jsonResult.length === 0) {
      return new Array(30).fill(""); // Return empty array if no data
    }

    const data1 = jsonResult[0]["DATA"];
    const boId = data1[0][134];
    console.log("bo_id:", boId);

    const guardianName = data1[0][122];
    const [guardianFirstName, guardianLastName] = parseFullName(guardianName);
    const guardianDOB = "31/07/2016";
    const guardianPAN = data1[0][124];

    const secondHolderName = data1[0][163];
    const [secondHolderFirstName, secondHolderLastName] =
      parseFullName(secondHolderName);
    const secondHolderPAN = data1[0][203];

    const thirdHolderName = data1[0][162];
    const [thirdHolderFirstName, thirdHolderLastName] =
      parseFullName(thirdHolderName);
    const thirdHolderPAN = data1[0][204];

    const holdingType =
      1 + (secondHolderFirstName ? 1 : 0) + (thirdHolderFirstName ? 1 : 0);
    const holdingNature = holdingType === 1 ? "SI" : "JO";

    // Default values
    return [
      holdingNature,
      secondHolderFirstName,
      "",
      secondHolderLastName,
      thirdHolderFirstName,
      "",
      thirdHolderLastName,
      "",
      "",
      guardianFirstName,
      "",
      guardianLastName,
      guardianDOB,
      "N",
      "N",
      "N",
      "N",
      secondHolderPAN,
      thirdHolderPAN,
      guardianPAN,
      "",
      "",
      "",
      "",
      "D",
      "N",
      "CDSL",
      "",
      "",
      "",
      "",
    ];
  } catch (error) {
    console.error("Error in dpDetails:", error.message);
    return new Array(30).fill("");
  }
};

const bankDetails = async (clientCode = "MM399") => {
  try {
    const currentYear = moment().year();
    const url = `${BASE_URL}/ClientBankDetailMultiple/ClientBankDetailMultiple1?&Client_id=${clientCode}&UrlUserName=${USERNAME}&UrlPassword=${PASSWORD}&UrlDatabase=capsfo&UrlDataYear=${currentYear}`;

    const jsonData = await fetchData(url);
    if (!jsonData || jsonData.length === 0) {
      return {};
    }

    const columns = jsonData[0]["COLUMNS"].map((col) => col.toLowerCase());
    const dataValues = jsonData[0]["DATA"];
    const bankLists = dataValues.map((data) => {
      return columns.reduce((acc, col, index) => {
        acc[col] = data[index];
        return acc;
      }, {});
    });

    const accountTypes = {};
    bankLists.forEach((bankInfo, bankCount) => {
      const bankIndex = bankCount + 1;
      accountTypes[bankIndex] = {
        Account_type: mapAccountType(bankInfo.bank_acctype),
        bank_def: bankInfo.default_ac === "Yes" ? "Y" : "N",
        Account_No: bankInfo.bank_acno,
        IFSC_Code: bankInfo.ifsc_code_act,
      };
    });

    console.log(accountTypes);
    return accountTypes;
  } catch (error) {
    console.error("Error in bankDetails:", error.message);
    return {};
  }
};

const mapAccountType = (accountType) => {
  const mapping = {
    Saving: "SB",
    Current: "CB",
    NRE: "NE",
    NRo: "NO",
  };
  return mapping[accountType] || "OT"; // Return 'OT' for other types
};

const userCreationSchema = async (clientCode = "MM399") => {
  try {
    const currentYear = moment().year();
    const url = `${BASE_URL}/ClientList/ClientList?&CLIENT_ID=${clientCode.toUpperCase()}&FROM_DATE=&TO_DATE=&UrlUserName=${USERNAME}&UrlPassword=${PASSWORD}&UrlDatabase=capsfo&UrlDataYear=${currentYear}`;

    const jsonResult = await fetchData(url);
    if (!jsonResult || jsonResult.length === 0) {
      return {};
    }

    const data = jsonResult[0]["DATA"];
    const clientName = data[0][569];
    const [clientFirstName, clientLastName] = parseFullName(clientName);

    const taxStatus = "01";
    const gender = data[0][34];
    const dateOfIncorporation = data[0][179];
    const DOB = dateOfIncorporation || data[0][241];

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
    const bankDict = await bankDetails(clientCode);

    return {
      Client_first_Name: clientFirstName,
      Client_last_Name: clientLastName,
      Occupation: occupation,
      Gender: gender,
      Date_of_Birth: DOB,
      Tax_Status: taxStatus,
      Bank_Details: bankDict,
    };
  } catch (error) {
    console.error("Error in userCreationSchema:", error.message);
    return {};
  }
};

// Example of how to call the main function
(async () => {
  const clientCode = "MM399"; // Replace with actual client code
  const userData = await userCreationSchema(clientCode);
  console.log(userData);
})();

//#########################################
const axios = require("axios");

// Function to create a new client
async function createClient(clientData) {
  const createUrl =
    "https://bsestarmfdemo.bseindia.com/StarMFCommonAPI/ClientMaster/Registration";
  try {
    const response = await axios.post(createUrl, clientData);
    console.log("Client created successfully:", response.data);
  } catch (error) {
    console.error(
      "Error creating client:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to modify an existing client
async function modifyClient(clientId, clientData) {
  const modifyUrl = `https://bsestarmfdemo.bseindia.com/StarMFCommonAPI/ClientMaster/Registration/${clientId}`;
  try {
    const response = await axios.put(modifyUrl, clientData);
    console.log("Client modified successfully:", response.data);
  } catch (error) {
    console.error(
      "Error modifying client:",
      error.response ? error.response.data : error.message
    );
  }
}

// Example payload structure for Mutual Fund New Enhanced UCC Registration
const clientPayload = {
  UserId: "640501",
  MemberCode: "6405",
  Password: "Abc@12345",
  RegnType: "MOD",
  Param:
    "A0030|MOHIT|MOHIT|MEHTA|01|M|24/09/1992|01|SI|||||||||||||N||||BOFPM9682G||||||||D|N|CDSL|12071700|00007865|||||||||SB|50100135485388||HDFC0001249|N||||||SB|017110026905||BKDN0230171|Y|||||||02|SURAT 395001|||SURAT|GU|395001|INDIA|8866855666||||mohit_mehta1992@yahoo.in|E||||||||||||8866855666|SIMONI MOHIT MEHTA|Spouse|100|N|||||||||||||||K||||||||||||||Z|||SE|SE|",
  Filler1: "",
  Filler2: "",
};

// Example usage
async function main() {
  // Creating a new client
  await createClient(clientPayload);

  // Modifying an existing client
  const clientId = "existingClientId"; // Replace with actual client ID
  const modifiedClientPayload = {
    ...clientPayload,
    mobile: "9876543211", // Example modification
  };
  await modifyClient(clientId, modifiedClientPayload);
}

main();
