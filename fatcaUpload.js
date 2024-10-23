const axios = require("axios");
const fs = require("fs");
const moment = require("moment/moment");
const path = require("path");

async function getPassword() {
  try {
    const url =
      "https://bsestarmfdemo.bseindia.com/StarMFFileUploadService/StarMFFileUploadService.svc/GetPassword";

    const payload = {
      MemberId: "6405",
      Password: "Abc@12345",
      UserId: "640501",
      PassKey: "abcdef1234",
    };

    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const passwordResponse = response.data.ResponseString;
    console.log("Encrypted Password:", passwordResponse);
    return passwordResponse;
  } catch (error) {
    console.error("Error fetching password:", error);
  }
}

async function Fatca_Payload(clientCode = "A0001") {
  try {
    const currentYear = new Date().getFullYear();

    const techResponse = await axios.get(
      `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientList/ClientList?CLIENT_ID=${clientCode.toUpperCase()}&FROM_DATE=&TO_DATE=&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${currentYear}`
    );

    const jesonResult = techResponse.data;
    const data = jesonResult[0].DATA;

    const PAN_RP = data[0][189];
    const PEKRN = "";
    const INV_NAME = data[0][569];
    const dateofoncrop = data[0][179];

    let DOB;
    if (dateofoncrop !== "") {
      DOB = moment(dateofoncrop, "DD/MM/YYYY").format("DD/MM/YYYY");
    } else {
      const DOB1 = data[0][241];
      DOB = moment(DOB1, "DD/MM/YYYY").format("DD/MM/YYYY");
    }

    const FR_NAME = "";
    const SP_NAME = "";
    const TAX_STATUS = "01";
    const DATA_SRC = "E";
    const ADDR_TYPE = "1";
    const PO_BIR_INC = "Individuals";
    const CO_BIR_INC = "IN";
    const TAX_RES1 = "IN";
    const TPIN1 = data[0][189];
    const ID1_TYPE = "C";
    const TAX_RES2 = "";
    const TPIN2 = "";
    const ID2_TYPE = "";
    const TAX_RES3 = "";
    const TPIN3 = "";
    const ID3_TYPE = "";
    const TAX_RES4 = "";
    const TPIN4 = "";
    const ID4_TYPE = "";
    const SRCE_WEALT = "02";
    const CORP_SERVS = "";
    const INC_SLAB = "32";
    const NET_WORTH = "";
    const NW_DATE = "";
    const PEP_FLAG = "N";

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

    const Occupation = data[0][430];
    const OCC_CODE = occupations[Occupation] || "01";

    const occ_type_dict = {
      Service: "S",
      Business: "B",
      Others: "O",
      Not_Categorized: "X",
    };

    const OCC_TYPE = occ_type_dict[Occupation] || "O";
    const EXEMP_CODE = "";
    const FFI_DRNFE = "";
    const GIIN_NO = "";
    const SPR_ENTITY = "";
    const GIIN_NA = "";
    const GIIN_EXEMC = "";
    const NFFE_CATG = "";
    const ACT_NFE_SC = "";
    const NATURE_BUS = "";
    const REL_LISTED = "";
    const EXCH_NAME = "B";
    const UBO_APPL = "N";
    const UBO_COUNT = "";
    const UBO_NAME = "";
    const UBO_PAN = "";
    const UBO_NATION = "";
    const UBO_ADD1 = "";
    const UBO_ADD2 = "";
    const UBO_ADD3 = "";
    const UBO_CITY = "";
    const UBO_PIN = "";
    const UBO_STATE = "";
    const UBO_CNTRY = "";
    const UBO_ADD_TY = "";
    const UBO_CTR = "";
    const UBO_TIN = "";
    const UBO_ID_TY = "";
    const UBO_COB = "";
    const UBO_DOB = "";
    const UBO_GENDER = "";
    const UBO_FR_NAM = "";
    const UBO_OCC = "";
    const UBO_OCC_TY = "";
    const UBO_TEL = "";
    const UBO_MOBILE = "";
    const UBO_CODE = "";
    const UBO_HOL_PC = "";
    const SDF_FLAG = "";
    const UBO_DF = "N";
    const AADHAAR_RP = "";
    const NEW_CHANGE = "N";
    const LOG_NAME = "196.15.16.107#23-Nov-15;16:4";
    const FILLER1 = "";
    const FILLER2 = "";

    const final_string =
      `${PAN_RP}|${PEKRN}|${INV_NAME}|${DOB}|${FR_NAME}|${SP_NAME}|${TAX_STATUS}|${DATA_SRC}` +
      `|${ADDR_TYPE}|${PO_BIR_INC}|${CO_BIR_INC}|${TAX_RES1}|${TPIN1}|${ID1_TYPE}` +
      `|${TAX_RES2}|${TPIN2}|${ID2_TYPE}|${TAX_RES3}|${TPIN3}|${ID3_TYPE}` +
      `|${TAX_RES4}|${TPIN4}|${ID4_TYPE}|${SRCE_WEALT}|${CORP_SERVS}|${INC_SLAB}` +
      `|${NET_WORTH}|${NW_DATE}|${PEP_FLAG}|${OCC_CODE}|${OCC_TYPE}|${EXEMP_CODE}` +
      `|${FFI_DRNFE}|${GIIN_NO}|${SPR_ENTITY}|${GIIN_NA}|${GIIN_EXEMC}|${NFFE_CATG}` +
      `|${ACT_NFE_SC}|${NATURE_BUS}|${REL_LISTED}|${EXCH_NAME}|${UBO_APPL}|${UBO_COUNT}` +
      `|${UBO_NAME}|${UBO_PAN}|${UBO_NATION}|${UBO_ADD1}|${UBO_ADD2}|${UBO_ADD3}|${UBO_CITY}` +
      `|${UBO_PIN}|${UBO_STATE}|${UBO_CNTRY}|${UBO_ADD_TY}|${UBO_CTR}|${UBO_TIN}|${UBO_ID_TY}|${UBO_COB}|${UBO_DOB}|${UBO_GENDER}|${UBO_FR_NAM}|${UBO_OCC}|${UBO_OCC_TY}|${UBO_TEL}` +
      `|${UBO_MOBILE}|${UBO_CODE}|${UBO_HOL_PC}|${SDF_FLAG}|${UBO_DF}|${AADHAAR_RP}|${NEW_CHANGE}` +
      `|${LOG_NAME}|${FILLER1}|${FILLER2}`;

    console.log("FATCA FUll String:", final_string);
    return final_string;
  } catch (error) {
    console.error("Fatca PayLoad Error:", error);
  }
}

async function main() {
  const password = await getPassword();
  const fatca_payload = await Fatca_Payload();

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
                <ns:EncryptedPassword>${password}</ns:EncryptedPassword>
                <ns:param>${fatca_payload}</ns:param>
            </ns:MFAPI>
        </soap:Body>
    </soap:Envelope>`;

  console.log("SOAP Request Payload:", payload);

  const headers = {
    "Content-Type": "application/soap+xml",
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log("Fatca Response: ", response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

main();
