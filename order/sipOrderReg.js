const axios = require("axios");

async function registerSIP() {
  const url =
    "https://bsestarmfdemo.bseindia.com/StarMFAPI/api/XSIP/XSIPRegistration";

  // const GoalType = {
  //   "Kids Marriage": "01",
  //   "Retirement Planning": "02",
  //   "Kids Education": "03",
  //   "Tax Savings": "04",
  //   "Dream House": "05",
  //   "Dream Car": "06",
  //   "Dream Vacation": "07",
  //   Others: "08",
  // };

  // const selectedGoalType = GoalType[goal] || GoalType["Others"];

  // const requestBody = {
  //   LoginId: "640501",
  //   MemberCode: "6405",
  //   Password: "Abc@12345",
  //   SchemeCode: "HDFCMCOG-GR",
  //   ClientCode: "A0031",
  //   IntRefNo: "1234567",
  //   TransMode: "P",
  //   DPTransMode: "P",
  //   StartDate: "10/12/2024",
  //   FrequencyType: "MONTHLY",
  //   FrequencyAllowed: "1",
  //   InstAmount: "1000",
  //   NoOfInst: "12",
  //   Remarks: "",
  //   FolioNo: "0",
  //   FirstOrderFlag: "N",
  //   SubBrCode: "",
  //   EUIN: "E159321",
  //   EUINFlag: "Y",
  //   DPC: "Y",
  //   SubBrokerARN: "",
  //   EndDate: "",
  //   SIPType: "01",
  //   TargetScheme: "",
  //   TargetAmount: "",
  //   GoalType: "",
  //   GoalAmount: "",
  //   Filler1: "",
  //   Filler2: "",
  //   Filler3: "",
  //   Filler4: "",
  //   Filler5: "",
  //   Filler6: "",
  //   Filler7: "",
  //   Filler8: "",
  //   Filler9: "",
  //   Filler10: "",
  // };

  const requestBody = {
    LoginId: "640501",
    MemberCode: "6405",
    Password: "Abc@12345",
    SchemeCode: "017G",
    ClientCode: "A0001",
    IntRefNo: "",
    TransMode: "D",
    DPTransMode: "C",
    StartDate: "05/11/2024",
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
    MandateId: "864491",
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
