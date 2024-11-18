// const axios = require("axios");
// const getfatcaPassword = require("./getfatcaPassword");

// async function fatcaUpload(client_code1 = "A0001") {
//   try {
//     const techResponse = await axios.get(
//       `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientList/ClientList?&CLIENT_ID=${client_code1.toUpperCase()}&FROM_DATE=&TO_DATE=&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${new Date().getFullYear()}`
//     );

//     const resultResponse = techResponse.data;
//     const result = resultResponse[0];
//     const data = result.DATA;

//     const PAN_RP = data[0][189];
//     const INV_NAME = data[0][569];
//     const DOB = formatDOB(data[0][179] || data[0][241]);

//     const TAX_STATUS = "01";
//     const ADDR_TYPE = "1";
//     const PO_BIR_INC = "Individuals";
//     const CO_BIR_INC = "IN";
//     const SRCE_WEALT = "02";
//     const INC_SLAB = "32";
//     const PEP_FLAG = "N";

//     const occupations = {
//       Business: { code: "01", type: "B" },
//       Services: { code: "02", type: "S" },
//       Professional: { code: "03", type: "P" },
//       Agriculture: { code: "04", type: "A" },
//       Retired: { code: "05", type: "R" },
//       Housewife: { code: "06", type: "H" },
//       Student: { code: "07", type: "S" },
//       Others: { code: "08", type: "O" },
//     };

//     const occupation = data[0][430] || "Others";
//     const { code: OCC_CODE, type: OCC_TYPE } =
//       occupations[occupation] || occupations["Others"];

//     const DATA_SRC = "E";

//     const fatcaPayload = [
//       PAN_RP,
//       "",
//       INV_NAME,
//       DOB,
//       "",
//       "",
//       TAX_STATUS,
//       DATA_SRC,
//       ADDR_TYPE,
//       PO_BIR_INC,
//       CO_BIR_INC,
//       "IN",
//       (TPIN1 = data[0][189]),
//       (ID1_TYPE = "C"),
//       "", // TAX_RES2
//       "", // TPIN2
//       "", // ID2_TYPE
//       "", // TAX_RES3
//       "", // TPIN3
//       "", // ID3_TYPE
//       "", // TAX_RES4
//       "", // TPIN4
//       "", // ID4_TYPE
//       SRCE_WEALT,
//       "",
//       INC_SLAB,
//       "",
//       "",
//       PEP_FLAG,
//       OCC_CODE, // Updated Occupation Code
//       OCC_TYPE, // Updated Occupation Type
//       "", // EXEMP_CODE
//       "", // FFI_DRNFE
//       "", // GIIN_NO
//       "", // SPR_ENTITY
//       "", // GIIN_NA
//       "", // GIIN_EXEMC
//       "", // NFFE_CATG
//       "", // ACT_NFE_SC
//       "", // NATURE_BUS
//       "", // REL_LISTED
//       "B", // EXCH_NAME
//       "N", // UBO_APPL
//       "", // UBO_COUNT
//       "", // UBO_NAME
//       "", // UBO_PAN
//       "", // UBO_NATION
//       "", // UBO_ADD1
//       "", // UBO_ADD2
//       "", // UBO_ADD3
//       "", // UBO_CITY
//       "", // UBO_PIN
//       "", // UBO_STATE
//       "", // UBO_CNTRY
//       "", // UBO_ADD_TY
//       "", // UBO_CTR
//       "", // UBO_TIN
//       "", // UBO_ID_TY
//       "", // UBO_COB
//       "", // UBO_DOB
//       "", // UBO_GENDER
//       "", // UBO_FR_NAM
//       "", // UBO_OCC
//       "", // UBO_OCC_TY
//       "", // UBO_TEL
//       "", // UBO_MOBILE
//       "", // UBO_CODE
//       "", // UBO_HOL_PC
//       "", // SDF_FLAG
//       "N", // UBO_DF
//       "", // AADHAAR_RP
//       "N", // NEW_CHANGE
//       "196.15.16.107#23-Nov-15;16:4", // LOG_NAME
//       "", // FILLER1
//       "", // FILLER2
//     ].join("|");

//     console.log(fatcaPayload);
//     return fatcaPayload;
//   } catch (error) {
//     console.error("Error generating FATCA payload:", error);
//   }
// }

// function formatDOB(dob) {
//   if (dob) {
//     const dateParts = dob.split("/");
//     const originalDate = new Date(
//       `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
//     );
//     return `${(originalDate.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}/${originalDate
//       .getDate()
//       .toString()
//       .padStart(2, "0")}/${originalDate.getFullYear()}`;
//   }
//   return "";
// }

// (async () => {
//   const password = await getfatcaPassword();
//   const extractedPassword = password.split("|")[1];

//   const fatcaPayload = await fatcaUpload();

//   const url =
//     "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure";

//   const payload = `
//     <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
//                        xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">
//         <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
//             <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/MFAPI</wsa:Action>
//             <wsa:To>${url}</wsa:To>
//         </soap:Header>
//         <soap:Body>
//             <ns:MFAPI>
//                 <ns:Flag>01</ns:Flag>
//                 <ns:UserId>640501</ns:UserId>
//                 <ns:EncryptedPassword>${extractedPassword}</ns:EncryptedPassword>
//                 <ns:param>${fatcaPayload}</ns:param>
//             </ns:MFAPI>
//         </soap:Body>
//     </soap:Envelope>`;

//   const headers = {
//     "Content-Type": "application/soap+xml",
//   };

//   try {
//     const response = await axios.post(url, payload, { headers });
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error submitting FATCA:", error);
//   }
// })();

// import axios from "axios";
// import getFatcaPassword from "./uploadFatcaGetPassword.service.js";
// const axios = require("axios");

// async function getPassword(userId, password, passKey) {
//   const soapRequest = `
//     <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
//         <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
//             <wsa:Action>http://bsestarmf.in/MFOrderEntry/getPassword</wsa:Action>
//             <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
//         </soap:Header>
//         <soap:Body>
//             <bses:getPassword>
//                 <bses:UserId>${userId}</bses:UserId>
//                 <bses:Password>${password}</bses:Password>
//                 <bses:PassKey>${passKey}</bses:PassKey>
//             </bses:getPassword>
//         </soap:Body>
//     </soap:Envelope>`;
//   try {
//     const response = await axios.post(
//       "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure",
//       soapRequest,
//       {
//         headers: { "Content-Type": "application/soap+xml;charset=UTF-8" },
//       }
//     );

//     const result = response.data.match(
//       /<getPasswordResult>(.*?)<\/getPasswordResult>/
//     )[1];
//     const [statusCode, encryptedPassword] = result.split("|");

//     if (statusCode === "100") {
//       console.log("Encrypted Password Generated:", encryptedPassword);
//       return encryptedPassword;
//     } else {
//       throw new Error("Authentication Failed: Invalid Credentials or PassKey");
//     }
//   } catch (error) {
//     console.error("Error generating password:", error.message);
//     throw error;
//   }
// }

// function createFatcaParams(data) {
//   return [
//     data.PAN_RP || "BOFPM9684A",
//     data.PEKRN || "",
//     data.INV_NAME || "YASH NARESHKUMAR MEHTA",
//     data.DOB || "11/14/1992",
//     data.FR_NAME || "",
//     data.SP_NAME || "",
//     data.TAX_STATUS || "01",
//     data.DATA_SRC || "E",
//     data.ADDR_TYPE || "1",
//     data.PO_BIR_INC || "Individuals",
//     data.CO_BIR_INC || "IN",
//     data.TAX_RES1 || "IN",
//     data.TPIN1 || "BOFPM9684A",
//     data.ID1_TYPE || "C",
//     data.TAX_RES2 || "",
//     data.TPIN2 || "",
//     data.ID2_TYPE || "",
//     data.TAX_RES3 || "",
//     data.TPIN3 || "",
//     data.ID3_TYPE || "",
//     data.TAX_RES4 || "",
//     data.TPIN4 || "",
//     data.ID4_TYPE || "",
//     data.SRCE_WEALT || "02",
//     data.CORP_SERVS || "",
//     data.INC_SLAB || "32",
//     data.NET_WORTH || "",
//     data.NW_DATE || "",
//     data.PEP_FLAG || "N",
//     data.OCC_CODE || "07",
//     data.OCC_TYPE || "O",
//     data.EXEMP_CODE || "",
//     data.FFI_DRNFE || "",
//     data.GIIN_NO || "",
//     data.SPR_ENTITY || "",
//     data.GIIN_NA || "",
//     data.GIIN_EXEMC || "",
//     data.NFFE_CATG || "",
//     data.ACT_NFE_SC || "",
//     data.NATURE_BUS || "",
//     data.REL_LISTED || "",
//     data.EXCH_NAME || "B",
//     data.UBO_APPL || "N",
//     data.UBO_COUNT || "",
//     data.UBO_NAME || "",
//     data.UBO_PAN || "",
//     data.UBO_NATION || "",
//     data.UBO_ADD1 || "",
//     data.UBO_ADD2 || "",
//     data.UBO_ADD3 || "",
//     data.UBO_CITY || "",
//     data.UBO_PIN || "",
//     data.UBO_STATE || "",
//     data.UBO_CNTRY || "",
//     data.UBO_ADD_TY || "",
//     data.UBO_CTR || "",
//     data.UBO_TIN || "",
//     data.UBO_ID_TY || "",
//     data.UBO_COB || "",
//     data.UBO_DOB || "",
//     data.UBO_GENDER || "",
//     data.UBO_FR_NAM || "",
//     data.UBO_OCC || "",
//     data.UBO_OCC_TY || "",
//     data.UBO_TEL || "",
//     data.UBO_MOBILE || "",
//     data.UBO_CODE || "",
//     data.UBO_HOL_PC || "",
//     data.SDF_FLAG || "",
//     data.UBO_DF || "",
//     data.AADHAAR_RP || "N",
//     data.NEW_CHANGE || "",
//     data.LOG_NAME || "N",
//     data.FILLER1 || "196.15.16.107#23-Nov-15;16:4",
//     data.FILLER2 || "",
//   ].join("|");
// }

// async function uploadFatca(data, encryptedPassword) {
//   const params = createFatcaParams(data);
//   console.log("params", params);

//   const soapRequest = `
//     <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://bsestarmf.in/">
//         <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
//             <wsa:Action>http://bsestarmf.in/FATCAUpload</wsa:Action>
//             <wsa:To>https://bsestarmfdemo.bseindia.com/FATCAUpload.svc/Secure</wsa:To>
//         </soap:Header>
//         <soap:Body>
//             <ns:FATCAUpload>
//                 <ns:UserId>640501</ns:UserId>
//                 <ns:EncryptedPassword>${encryptedPassword}</ns:EncryptedPassword>
//                 <ns:Param>${params}</ns:Param>
//             </ns:FATCAUpload>
//         </soap:Body>
//     </soap:Envelope>`;

//   try {
//     const response = await axios.post(
//       "https://bsestarmfdemo.bseindia.com/FATCAUpload.svc/Secure",
//       soapRequest,
//       {
//         headers: { "Content-Type": "application/soap+xml;charset=UTF-8" },
//       }
//     );

//     console.log("FATCA Upload Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading FATCA data:", error.message);
//     throw error;
//   }
// }

// (async () => {
//   try {
//     const userId = "640501";
//     const password = "Abc@12345";
//     const passKey = "Abcd@123";

//     // Generate Encrypted Password
//     const encryptedPassword = await getPassword(userId, password, passKey);

//     // FATCA Data (Example)
//     const fatcaData = {
//       PAN_RP: "ABCDE1234F",
//       INV_NAME: "John Doe",
//       DOB: "1990-01-01",
//       TAX_STATUS: "01",
//       DATA_SRC: "E",
//       ADDR_TYPE: "02",
//       EXCH_NAME: "B",
//       UBO_APPL: "Y",
//       PO_BIR_INC: "IN",
//       NET_WORTH: "5000000",
//       NW_DATE: "2023-03-31",
//       OCC_CODE: "01",
//       PEP_FLAG: "N",
//     };

//     // Upload FATCA Data
//     const response = await uploadFatca(fatcaData, encryptedPassword);
//     console.log("FATCA Upload Success:", response);
//   } catch (error) {
//     console.error("Integration Error:", error.message);
//   }
// })();

const axios = require("axios");

/**
 * FATCA Upload API
 */
async function uploadFatca(data) {
  // Replace these credentials with actual values
  const userId = "640501";
  const encryptedPassword =
    "bcuW+vPWy0bc4PB+4QWmSFY9t5TOd4t4CgYFftwh1a+9k7rahCTtDw==";

  // Construct the param field
  const params = [
    data.PAN_RP || "BOFPM9684A",
    data.PEKRN || "",
    data.INV_NAME || "YASH NARESHKUMAR MEHTA",
    data.DOB || "11/14/1992",
    data.FR_NAME || "",
    data.SP_NAME || "",
    data.TAX_STATUS || "01",
    data.DATA_SRC || "E",
    data.ADDR_TYPE || "1",
    data.PO_BIR_INC || "Individuals",
    data.CO_BIR_INC || "IN",
    data.TAX_RES1 || "IN",
    data.TPIN1 || "BOFPM9684A",
    data.ID1_TYPE || "C",
    data.TAX_RES2 || "",
    data.TPIN2 || "",
    data.ID2_TYPE || "",
    data.TAX_RES3 || "",
    data.TPIN3 || "",
    data.ID3_TYPE || "",
    data.TAX_RES4 || "",
    data.TPIN4 || "",
    data.ID4_TYPE || "",
    data.SRCE_WEALT || "02",
    data.CORP_SERVS || "",
    data.INC_SLAB || "32",
    data.NET_WORTH || "",
    data.NW_DATE || "",
    data.PEP_FLAG || "N",
    data.OCC_CODE || "07",
    data.OCC_TYPE || "O",
    data.EXEMP_CODE || "",
    data.FFI_DRNFE || "",
    data.GIIN_NO || "",
    data.SPR_ENTITY || "",
    data.GIIN_NA || "",
    data.GIIN_EXEMC || "",
    data.NFFE_CATG || "",
    data.ACT_NFE_SC || "",
    data.NATURE_BUS || "",
    data.REL_LISTED || "",
    data.EXCH_NAME || "B",
    data.UBO_APPL || "N",
    data.UBO_COUNT || "",
    data.UBO_NAME || "",
    data.UBO_PAN || "",
    data.UBO_NATION || "",
    data.UBO_ADD1 || "",
    data.UBO_ADD2 || "",
    data.UBO_ADD3 || "",
    data.UBO_CITY || "",
    data.UBO_PIN || "",
    data.UBO_STATE || "",
    data.UBO_CNTRY || "",
    data.UBO_ADD_TY || "",
    data.UBO_CTR || "",
    data.UBO_TIN || "",
    data.UBO_ID_TY || "",
    data.UBO_COB || "",
    data.UBO_DOB || "",
    data.UBO_GENDER || "",
    data.UBO_FR_NAM || "",
    data.UBO_OCC || "",
    data.UBO_OCC_TY || "",
    data.UBO_TEL || "",
    data.UBO_MOBILE || "",
    data.UBO_CODE || "",
    data.UBO_HOL_PC || "",
    data.SDF_FLAG || "",
    data.UBO_DF || "N",
    data.AADHAAR_RP || "",
    data.NEW_CHANGE || "N",
    data.LOG_NAME || "196.15.16.107#23-Nov-15;16:4",
    data.FILLER1 || "",
    data.FILLER2 || "",
  ].join("|");

  console.log('params', params)

  // Construct the SOAP Request Body
  const soapRequest = `
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">
          <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
              <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/MFAPI</wsa:Action>
              <wsa:To>https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure</wsa:To>
          </soap:Header>
          <soap:Body>
              <ns:MFAPI>
                  <ns:Flag>01</ns:Flag>
                  <ns:UserId>${userId}</ns:UserId>
                  <ns:EncryptedPassword>${encryptedPassword}</ns:EncryptedPassword>
                  <ns:param>${params}</ns:param>
              </ns:MFAPI>
          </soap:Body>
      </soap:Envelope>`;

  try {
    // Send SOAP request using Axios
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure",
      soapRequest,
      {
        headers: {
          "Content-Type": "application/soap+xml;charset=UTF-8",
        },
      }
    );

    // Log and return the response
    console.log("FATCA Upload Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading FATCA data:", error.message);
    throw error;
  }
}

/**
 * Example Call
 */
(async () => {
  const fatcaData = {
    PAN_RP: "BOFPM9684A",
    INV_NAME: "YASH NARESHKUMAR MEHTA",
    DOB: "11/14/1992",
    TAX_STATUS: "01",
    DATA_SRC: "E",
    ADDR_TYPE: "1",
    PO_BIR_INC: "Individuals",
    CO_BIR_INC: "IN",
    TAX_RES1: "IN",
    TPIN1: "BOFPM9684A",
    ID1_TYPE: "C",
    SRCE_WEALT: "02",
    INC_SLAB: "32",
    PEP_FLAG: "N",
    OCC_CODE: "07",
    OCC_TYPE: "O",
    EXCH_NAME: "B",
    UBO_APPL: "N",
    UBO_DF: "N",
    AADHAAR_RP: "N",
    NEW_CHANGE: "C",
    LOG_NAME: "N",
    // Add any other fields as necessary...
  };

  try {
    const result = await uploadFatca(fatcaData);
    console.log("FATCA Upload Result:", result);
  } catch (err) {
    console.error("FATCA Upload Error:", err.message);
  }
})();
