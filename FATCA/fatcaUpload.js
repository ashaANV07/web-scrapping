const axios = require("axios");
const getfatcaPassword = require("./getfatcaPassword");

async function fatcaUpload(client_code1 = "A0001") {
  try {
    const techResponse = await axios.get(
      `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientList/ClientList?&CLIENT_ID=${client_code1.toUpperCase()}&FROM_DATE=&TO_DATE=&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${new Date().getFullYear()}`
    );

    const resultResponse = techResponse.data;
    const result = resultResponse[0];
    const data = result.DATA;

    const PAN_RP = data[0][189];
    const INV_NAME = data[0][569];
    const DOB = formatDOB(data[0][179] || data[0][241]);

    const TAX_STATUS = "01";
    const ADDR_TYPE = "1";
    const PO_BIR_INC = "Individuals";
    const CO_BIR_INC = "IN";
    const SRCE_WEALT = "02";
    const INC_SLAB = "32";
    const PEP_FLAG = "N";

    const occupations = {
      Business: { code: "01", type: "B" },
      Services: { code: "02", type: "S" },
      Professional: { code: "03", type: "P" },
      Agriculture: { code: "04", type: "A" },
      Retired: { code: "05", type: "R" },
      Housewife: { code: "06", type: "H" },
      Student: { code: "07", type: "S" },
      Others: { code: "08", type: "O" },
    };

    const occupation = data[0][430] || "Others";
    const { code: OCC_CODE, type: OCC_TYPE } =
      occupations[occupation] || occupations["Others"];

    const DATA_SRC = "E";

    const fatcaPayload = [
      PAN_RP,
      "",
      INV_NAME,
      DOB,
      "",
      "",
      TAX_STATUS,
      DATA_SRC,
      ADDR_TYPE,
      PO_BIR_INC,
      CO_BIR_INC,
      "IN",
      (TPIN1 = data[0][189]),
      (ID1_TYPE = "C"),
      "", // TAX_RES2
      "", // TPIN2
      "", // ID2_TYPE
      "", // TAX_RES3
      "", // TPIN3
      "", // ID3_TYPE
      "", // TAX_RES4
      "", // TPIN4
      "", // ID4_TYPE
      SRCE_WEALT,
      "",
      INC_SLAB,
      "",
      "",
      PEP_FLAG,
      OCC_CODE, // Updated Occupation Code
      OCC_TYPE, // Updated Occupation Type
      "", // EXEMP_CODE
      "", // FFI_DRNFE
      "", // GIIN_NO
      "", // SPR_ENTITY
      "", // GIIN_NA
      "", // GIIN_EXEMC
      "", // NFFE_CATG
      "", // ACT_NFE_SC
      "", // NATURE_BUS
      "", // REL_LISTED
      "B", // EXCH_NAME
      "N", // UBO_APPL
      "", // UBO_COUNT
      "", // UBO_NAME
      "", // UBO_PAN
      "", // UBO_NATION
      "", // UBO_ADD1
      "", // UBO_ADD2
      "", // UBO_ADD3
      "", // UBO_CITY
      "", // UBO_PIN
      "", // UBO_STATE
      "", // UBO_CNTRY
      "", // UBO_ADD_TY
      "", // UBO_CTR
      "", // UBO_TIN
      "", // UBO_ID_TY
      "", // UBO_COB
      "", // UBO_DOB
      "", // UBO_GENDER
      "", // UBO_FR_NAM
      "", // UBO_OCC
      "", // UBO_OCC_TY
      "", // UBO_TEL
      "", // UBO_MOBILE
      "", // UBO_CODE
      "", // UBO_HOL_PC
      "", // SDF_FLAG
      "N", // UBO_DF
      "", // AADHAAR_RP
      "N", // NEW_CHANGE
      "196.15.16.107#23-Nov-15;16:4", // LOG_NAME
      "", // FILLER1
      "", // FILLER2
    ].join("|");

    console.log(fatcaPayload);
    return fatcaPayload;
  } catch (error) {
    console.error("Error generating FATCA payload:", error);
  }
}

function formatDOB(dob) {
  if (dob) {
    const dateParts = dob.split("/");
    const originalDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    );
    return `${(originalDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${originalDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${originalDate.getFullYear()}`;
  }
  return "";
}

(async () => {
  const password = await getfatcaPassword();
  const extractedPassword = password.split("|")[1];

  const fatcaPayload = await fatcaUpload();

  const url =
    "https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure";

  const payload = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
                       xmlns:ns="http://bsestarmfdemo.bseindia.com/2016/01/">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
            <wsa:Action>http://bsestarmfdemo.bseindia.com/2016/01/IMFUploadService/MFAPI</wsa:Action>
            <wsa:To>${url}</wsa:To>
        </soap:Header>
        <soap:Body>
            <ns:MFAPI>
                <ns:Flag>01</ns:Flag>
                <ns:UserId>640501</ns:UserId>
                <ns:EncryptedPassword>${extractedPassword}</ns:EncryptedPassword>
                <ns:param>${fatcaPayload}</ns:param>
            </ns:MFAPI>
        </soap:Body>
    </soap:Envelope>`;

  const headers = {
    "Content-Type": "application/soap+xml",
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error submitting FATCA:", error);
  }
})();
