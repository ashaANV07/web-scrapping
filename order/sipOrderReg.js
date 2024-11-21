const axios = require("axios");

async function registerSIP() {
  const url =
    "https://bsestarmfdemo.bseindia.com/StarMFAPI/api/XSIP/XSIPRegistration";

  const requestBody = {
    LoginId: "640501",
    MemberCode: "6405",
    Password: "Abc@0707",
    SchemeCode: "017G",
    ClientCode: "A0001",
    IntRefNo: "",
    TransMode: "D",
    DPTransMode: "C",
    StartDate: "22/11/2024",
    FrequencyType: "MONTHLY",
    FrequencyAllowed: "1",
    InstAmount: "1000",
    NoOfInst: "12",
    Remarks: "",
    FolioNo: "",
    FirstOrderFlag: "N",
    SubBrCode: "",
    EUIN: "E159321",
    EUINFlag: "Y",
    DPC: "Y",
    SubBrokerARN: "",
    EndDate: "",
    RegnType: "XSIP",
    Brokerage: "",
    MandateId: "877363",
    XSIPType: "01",
    TargetScheme: "",
    TargetAmount: "",
    GoalType: "",
    GoalAmount: "",
    Filler1: "",
    Filler2: "",
    Filler3: "",
    Filler4: "",
    Filler5: "",
    Filler6: "",
    Filler7: "",
    Filler8: "",
    Filler9: "",
    Filler10: "",
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        SOAPAction: "http://bsestarmf.in/MFOrderEntry/xsipOrderEntryParam",
        APIKEY: "VmxST1UyRkhUbkpOVldNOQ==",
      },
    });

    console.log("Response:", response.data);

    if (response.data.SuccessFlag === "0") {
      console.log("SIP Registration successful:", response.data.SIPRegId);
    } else {
      console.log("SIP Registration failed:", response.data.BSERemarks);
    }
  } catch (error) {
    console.error("Error during SIP registration:", error);
  }
}

registerSIP();
