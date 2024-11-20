const axios = require("axios");
const moment = require("moment");

// Helper function for DP details
async function dpDetails(clientCode = "A1795") {
  try {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const urlKyc = `http://192.168.102.101:8080/techexcelapi/index.cfm/DP_CLIENT_DATA_LIST/DP_CLIENT_DATA_LIST1?.&Client_id=${clientCode}&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo${currentYear}&UrlDataYear=${currentYear}&FROM_DATE=30/04/2002&TO_DATE=30/04/${nextYear}&BO_ID=&DataBaseName=`;

    const techResponse = await axios.get(urlKyc);
    const result = techResponse.data[0];
    const data1 = result.DATA;
    console.log('data1', data1)

    const boId = data1[0][134];
    console.log('boId', boId)
    const dpId = data1[0][137];
    const fullGuardianName = data1[0][122].split(" ");

    let guardianFirstName = "";
    let guardianLastName = "";
    let guardianDOB = "";
    let guardianPAN = data1[0][124];

    if (fullGuardianName.length > 1) {
      guardianFirstName = fullGuardianName[0];
      guardianLastName = fullGuardianName[fullGuardianName.length - 1];
      guardianDOB = "31/07/2016";
    }

    const secondHolderName = data1[0][163].split(" ");
    let secondHolderFirstName = "";
    let secondHolderLastName = "";
    let secondHolderDOB = "";
    let secondHolderPAN = "";

    if (secondHolderName.length > 1) {
      secondHolderFirstName = secondHolderName[0];
      secondHolderLastName = secondHolderName[1];
      secondHolderPAN = data1[0][203];
    }

    const thirdHolderName = data1[0][162].split(" ");
    let thirdHolderFirstName = "";
    let thirdHolderLastName = "";
    let thirdHolderDOB = "";
    let thirdHolderPAN = "";

    if (thirdHolderName.length > 1) {
      thirdHolderFirstName = secondHolderName[0];
      thirdHolderLastName = secondHolderName[1];
      thirdHolderPAN = data1[0][204];
    }

    let holdingType = 1;
    if (secondHolderFirstName !== "") holdingType++;
    if (thirdHolderFirstName !== "") holdingType++;

    const holdingNature = holdingType === 1 ? "SI" : "JO";

    const responseData = {
      holdingNature,
      secondHolderFirstName,
      secondHolderMiddleName: "",
      secondHolderLastName,
      thirdHolderFirstName,
      thirdHolderMiddleName: "",
      thirdHolderLastName,
      secondHolderDOB,
      thirdHolderDOB,
      guardianFirstName,
      guardianHolderMiddleName: "",
      guardianLastName,
      guardianDOB,
      primaryHolderPANExempt: "N",
      secondHolderPANExempt: "",
      thirdHolderPANExempt: "",
      guardianPANExempt: "",
      secondHolderPAN,
      thirdHolderPAN,
      guardianPAN,
      primaryHolderPANExemptCategory: "",
      secondHolderPANExemptCategory: "",
      thirdHolderPANExemptCategory: "",
      guardianHolderPANExemptCategory: "",
      clientType: "D",
      PMS: "N",
      defaultDP: "CDSL",
      dpId,
      CDSLCLTID: boId.slice(-8),
      CMBPId: "",
      NSDLDPID: "",
      NSDLCLTID: "",
    };

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Helper function for bank details
async function bankDetails(clientCode = "A1795") {
  try {
    const currentYear = new Date().getFullYear();
    const urlKyc = `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientBankDetailMultiple/ClientBankDetailMultiple1?&Client_id=${clientCode}&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${currentYear}`;

    const kycResponse = await axios.get(urlKyc);
    const data = kycResponse.data;

    const columns = data[0].COLUMNS.map((col) => col.toLowerCase());
    const dataValues = data[0].DATA;

    const columnsToKeep = [
      "bank_name",
      "bank_acno",
      "ifsc_code_act",
      "micr_code",
      "bank_acctype",
      "default_ac",
    ];

    const bankLists = dataValues.map((row) =>
      columnsToKeep.map((col) => row[columns.indexOf(col)])
    );

    const accountTypes = {};

    bankLists.forEach((bank, index) => {
      const bankCount = index + 1;
      accountTypes[bankCount] = {};

      let accountType = "";
      switch (bank[4]) {
        case "Saving":
          accountType = "SB";
          break;
        case "Current":
          accountType = "CB";
          break;
        case "NRE":
          accountType = "NE";
          break;
        case "NRo":
          accountType = "NO";
          break;
        default:
          accountType = "";
      }

      accountTypes[bankCount][`Account_type_${bankCount}`] = accountType;
      accountTypes[bankCount][`bank_def_${bankCount}`] =
        bank[5] === "Yes" ? "Y" : "N";
      accountTypes[bankCount][`Account_No_${bankCount}`] = bank[1];
      accountTypes[bankCount][`MICR_No_${bankCount}`] = "";
      accountTypes[bankCount][`IFSC_Code_${bankCount}`] = bank[2];
    });

    return accountTypes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Main function for user creation schema
async function userCreationSchema(clientCode = "A1795") {
  try {
    const currentYear = new Date().getFullYear();
    const clientListUrl = `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientList/ClientList?&CLIENT_ID=${clientCode.toUpperCase()}&FROM_DATE=&TO_DATE=&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${currentYear}`;

    const techResponse = await axios.get(clientListUrl);
    const result = techResponse.data[0];
    const data = result.DATA;

    // Client Name Processing
    const clientName = data[0][569].split(" ");
    const clientFirstName = clientName[0];
    const clientMiddleName = clientName[0];
    const clientLastName = clientName[clientName.length - 1];

    // Basic Details
    const taxStatus = "01";
    const gender = data[0][34];

    // Date Processing
    const dateOfIncorp = data[0][179];
    let DOB = dateOfIncorp ? dateOfIncorp : data[0][241];
    const EmailId = data[0][178];

    // Occupation Processing
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

    // Get DP and Bank Details
    const dpData = await dpDetails(clientCode);
    const bankDict = await bankDetails(clientCode);

    // Process Bank Details
    const getBankDetails = (bankDict, index) => {
      try {
        return {
          accountType: bankDict[index][`Account_type_${index}`] || "",
          accountNo: bankDict[index][`Account_No_${index}`] || "",
          micrNo: bankDict[index][`MICR_No_${index}`] || "",
          ifscCode: bankDict[index][`IFSC_Code_${index}`] || "",
          defaultFlag: bankDict[index][`bank_def_${index}`] || "",
        };
      } catch {
        return {
          accountType: "",
          accountNo: "",
          micrNo: "",
          ifscCode: "",
          defaultFlag: "",
        };
      }
    };

    // Get bank details for all accounts
    const bank1 = getBankDetails(bankDict, 1);
    console.log('bank1', bank1)
    const bank2 = getBankDetails(bankDict, 2);
    const bank3 = getBankDetails(bankDict, 3);
    const bank4 = getBankDetails(bankDict, 4);
    const bank5 = getBankDetails(bankDict, 5);

    // Address Processing
    const residentialAddress = `${data[0][9]}${data[0][10]}${data[0][11]}`; // Removed spaces
    const addressParts = residentialAddress.split(", ");

    let addressline1 = "";
    let addressline2 = "";

    // Loop through address parts
    addressParts.forEach((part) => {
      if (addressline1.length + part.length + 2 <= 40) {
        // Add 2 for comma and space
        addressline1 += part + ", ";
      } else if (addressline2.length + part.length + 2 <= 40) {
        addressline2 += part + ", ";
      }
    });

    // Remove trailing commas and spaces
    addressline1 = addressline1.trim().replace(/,$/, "");
    addressline2 = addressline2.trim().replace(/,$/, "");

    // Build the final payload string
    // Note: This is a simplified version. You'll need to add all the fields as per your requirements
    const finalPayload = [
      clientCode,
      clientFirstName,
      clientMiddleName,
      clientLastName,
      taxStatus,
      gender,
      DOB,
      occupation,

      dpData.holdingNature,
      dpData.secondHolderFirstName,
      dpData.secondHolderMiddleName,
      dpData.secondHolderLastName,

      dpData.thirdHolderFirstName,
      dpData.thirdHolderMiddleName,
      dpData.thirdHolderLastName,

      dpData.secondHolderDOB,
      dpData.thirdHolderDOB,

      dpData.guardianFirstName,
      dpData.guardianHolderMiddleName,
      dpData.guardianLastName,
      dpData.guardianDOB,

      dpData.primaryHolderPANExempt,
      dpData.secondHolderPANExempt,
      dpData.thirdHolderPANExempt,
      dpData.guardianPANExempt,
      data[0][189], // Primary Holder PAN
      dpData.secondHolderPAN,
      dpData.thirdHolderPAN,
      dpData.guardianPAN,

      dpData.primaryHolderPANExemptCategory,
      dpData.secondHolderPANExemptCategory,
      dpData.thirdHolderPANExemptCategory,
      dpData.guardianHolderPANExemptCategory,

      dpData.clientType,
      dpData.PMS,
      dpData.defaultDP,
      dpData.dpId,
      dpData.CDSLCLTID,
      dpData.CMBPId,
      dpData.NSDLDPID,
      dpData.NSDLCLTID,

      bank1.accountType,
      bank1.accountNo,
      bank1.micrNo,
      bank1.ifscCode,
      bank1.defaultFlag,

      bank2.accountType,
      bank2.accountNo,
      bank2.micrNo,
      bank2.ifscCode,
      bank2.defaultFlag,

      bank3.accountType,
      bank3.accountNo,
      bank3.micrNo,
      bank3.ifscCode,
      bank3.defaultFlag,

      bank4.accountType,
      bank4.accountNo,
      bank4.micrNo,
      bank4.ifscCode,
      bank4.defaultFlag,

      bank5.accountType,
      bank5.accountNo,
      bank5.micrNo,
      bank5.ifscCode,
      bank5.defaultFlag,

      "", // Cheque name
      "02", // Div pay mode
      addressline1,
      addressline2,
      "", // addressline3
      data[0][59], // city
      //   stateAbbr[data[0][134]] || stateAbbr["Others"], // state
      "GU",
      data[0][60], // pincode
      data[0][145], // country
      data[0][156], // telephone_no
      "", // Resi_Fax
      "", // Office_Phone
      "", // Office_Fax
      EmailId, // Email
      "E", // Communication_Mode
      "", // Foreign_Address_1
      "", // Foreign_Address_2
      "", // Foreign_Address_3
      "", // Foreign_city
      "", // Foreign_pincode
      "", // Foreign_state
      "", // Foreign_country
      "", // Foreign_telephone_no
      "", // Foreign_Resi_Fax
      "", // Foreign_Office_Phone
      "", // Foreign_Resi_Fax
      data[0][156], // india_mobil_no
      data[0][242], // Nominee_Name_1
      "20", //   data[0][243], // Nominee_Relationship_1
      "100", // Nominee_Applicable_1
      "N", // Nominee_Minor_Flag_1
      "", // Nominee_DOB_1
      "", // Nominee_Guardian_1
      "", // Nominee_Name_2
      "", // Nominee_Relationship_2
      "", // Nominee_Applicable_2
      "", // Nominee_Minor_Flag_2
      "", // Nominee_DOB_2
      "", // Nominee_Guardian_2
      "", // Nominee_Name_3
      "", // Nominee_Relationship_3
      "", // Nominee_Applicable_3
      "", // Nominee_Minor_Flag_3
      "", // Nominee_DOB_3
      "", // Nominee_Guardian_3
      "K", // Primary_Holder_KYC_Type
      "", // Primary_Holder_CKYC_No
      "", // second_Holder_KYC_Type
      "", // second_Holder_CKYC_No
      "", // third_Holder_KYC_Type
      "", // third_Holder_CKYC_No
      "", // guardian_Holder_KYC_Type
      "", // guardian_Holder_CKYC_No
      "", // Primary_Holder_KRA
      "", // Second_Holder_KRA
      "", // Third_Holder_KRA
      "", // Guardian_Holder_KRA
      "", // Aadhaar_Updated,
      "", //Mapin Id
      "Z", // Paperless_flag
      "", // LEI_No
      "", // LEI_Validity
      "SE", // Filler_1
      "SE", // Filler_2
      "Y", //nmonination opt
      "O", //nmonination auth
      "", //nominee pan1
      "", //nominee guardian pan1
      "", //nominee pan2
      "", //nominee guardian pan2
      "", //nominee pan3
      "", //nominee guardian pan3
      "", //secound holder email
      "", // secound holder email declaration
      "", // secound holder mobile no
      "", // secound holder mobile declaration
      "", //third holder email
      "", // third holder email declaration
      "", // third holder mobile no
      "", // third holder mobile declaration
      "", // guardian relationship
      "", //filler1
      "", //filler2
      "", //filler3
    ].join("|");

    console.log("finalPayload", finalPayload);

    // Make the registration API call
    // const registrationUrl =
    //   "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/UCCAPI/UCCRegistration";

    // const registrationPayload = {
    //   UserId: "640501",
    //   MemberCode: "6405",
    //   Password: "Abc@0707",
    //   RegnType: "NEW",
    //   Param: finalPayload,
    //   Filler1: "",
    //   Filler2: "",
    // };

    // const response = await axios.post(registrationUrl, registrationPayload, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log("response", response.data);
    // return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

userCreationSchema();
