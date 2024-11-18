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

function constructParam(data) {
  return [
    data.ClientCode || "ucc0010",
    data.FirstName || "FirstName",
    data.MiddleName || "",
    data.LastName || "LastName",
    data.TaxStatus || "01",
    data.Gender || "M",
    data.DOB || "01/01/1980",
    data.OccupationCode || "01",
    data.HoldingNature || "SI",
    data.secondHolderFirstName || "",
    data.secondHolderMiddleName || "",
    data.secondHolderLastName || "",
    data.thirdHolderFirstName || "",
    data.thirdHolderMiddleName || "",
    data.thirdHolderLastName || "",
    data.secondHolderDOB || "",
    data.thirdHolderDOB || "",
    data.guardianFirstName || "",
    data.guardianMiddleName || "",
    data.guardianLastName || "",
    data.guardianDOB || "",
    data.primaryHolderPanExempt || "N",
    data.secondHolderPanExempt || "",
    data.thirdHolderPanExempt || "",
    data.guardianPanExempt || "",
    data.primaryHolderPAN || "AFEPK2130F",
    data.secondHolderPAN || "",
    data.thirdHolderPAN || "",
    data.guardianPAN || "",
    data.primaryHolderPanExemptCategory || "",
    data.secondHolderPanExemptCategory || "",
    data.thirdHolderPanExemptCategory || "",
    data.guardianPanExemptCategory || "",
    data.ClientType || "P",
    data.PMSFlag || "",
    data.DefaultDP || "",
    data.cdslDpID || "",
    data.cdslCLTID || "",
    data.CMBPid || "",
    data.NSDLDPID || "",
    data.NSDLCLTID || "",
    data.accType1 || "SB",
    data.accNo1 || "11415",
    data.MICRNo1 || "",
    data.IFSCCode1 || "HDFC0000001",
    data.DefaultBankFlag1 || "Y",
    data.accType2 || "",
    data.accNo2 || "",
    data.MICRNo2 || "",
    data.IFSCCode2 || "",
    data.DefaultBankFlag2 || "",
    data.accType3 || "",
    data.accNo3 || "",
    data.MICRNo3 || "",
    data.IFSCCode3 || "",
    data.DefaultBankFlag3 || "",
    data.accType4 || "",
    data.accNo4 || "",
    data.MICRNo4 || "",
    data.IFSCCode4 || "",
    data.DefaultBankFlag4 || "",
    data.accType5 || "",
    data.accNo5 || "",
    data.MICRNo5 || "",
    data.IFSCCode5 || "",
    data.DefaultBankFlag5 || "",
    data.ChequeName || "FirstNameLastName",
    data.DividendPaymode || "01",
    data.Address1 || "ADD1",
    data.Address2 || "ADD2",
    data.Address3 || "ADD3",
    data.City || "MUMBAI",
    data.StateCode || "MA",
    data.PostalCode || "400001",
    data.Country || "INDIA",
    data.ResiPhone || "22721233",
    data.ResiFax || "",
    data.OfficePhone || "",
    data.OfficeFax || "",
    data.Email || "test@test.com",
    data.CommunicationMode || "P",
    data.ForeignAddress1 || "",
    data.ForeignAddress2 || "",
    data.ForeignAddress3 || "",
    data.ForeignCity || "",
    data.ForeignPinCode || "",
    data.ForeignState || "",
    data.ForeignCountry || "",
    data.ForeignPhone || "",
    data.ForeignFax || "",
    data.ForeignOfficePhone || "",
    data.ForeignOfficeFax || "",
    data.IndianMobileNo || "9999999999",
    data.Nominee1Name || "NomineeName1",
    data.Nominee1Relation || "01",
    data.Nominee1Applicable || "100",
    data.Nominee1MinorFlag || "N",
    data.Nominee1DOB || "",
    data.Nominee1guardianFlag || "",
    data.Nominee2Name || "",
    data.Nominee2Relation || "",
    data.Nominee2Applicable || "",
    data.Nominee2MinorFlag || "",
    data.Nominee2DOB || "",
    data.Nominee2guardianFlag || "",
    data.Nominee3Name || "",
    data.Nominee3Relation || "",
    data.Nominee3Applicable || "",
    data.Nominee3MinorFlag || "",
    data.Nominee3DOB || "",
    data.Nominee3guardianFlag || "",
    data.primaryHolderKycType || "K",
    data.primaryHolderCkycNumber || "", 
    data.secondHolderKycType || "",
    data.secondHolderCkycNumber || "",
    data.thirdHolderKycType || "",
    data.thirdHolderCkycNumber || "",
    data.guardianKycType || "",
    data.guardianCkycNumber || "",
    data.primaryHolderKraExemptRefNo || "",
    data.secondHolderKraExemptRefNo || "",
    data.thirdHolderKraExemptRefNo || "",
    data.guardianKraExemptRefNo || "",
    data.AadhaarUpdated || "N",
    data.MapinId || "",
    data.PaperlessFlag || "P",
    data.LEINo || "",
    data.LEIValidity || "",
    data.Filter1 || "SE",
    data.Filter2 || "SE",
    data.NominationOpt || "Y",
    data.NominationAuthMode || "O",
    data.Nominee1Pan || "",
    data.Nominee1GuardianPan || "",
    data.Nominee2Pan || "",
    data.Nominee2GuardianPan || "",
    data.Nominee3Pan || "",
    data.Nominee3GuardianPan || "",
    data.secondHolderEmail || "",
    data.secondHolderEmailDeclaration || "",
    data.secondHolderMobileNo || "",
    data.secondHolderMobileNoDeclaration || "", 
    data.thirdHolderEmail || "",
    data.thirdHolderEmailDeclaration || "",
    data.thirdHolderMobileNo || "",
    data.thirdHolderMobileNoDeclaration || "", 
    data.guardianRelation || "",
    data.filler1 || "",
    data.filler2 || "",
    data.filler3 || "",
  ].join("|");
}

async function registerUCC(data) {
  const apiUrl =
    "https://bsestarmfdemo.bseindia.com/BSEMFWEBAPI/UCCAPI/UCCRegistration";

  try {
    const paramString = constructParam(data); 

    const payload = {
      UserId: "640501", 
      MemberCode: "6405", 
      Password: "Abc@12345", 
      RegnType: data.RegnType || "NEW", 
      Param: paramString, 
      Filler1: data.Filler1 || "",
      Filler2: data.Filler2 || "",
    };

    console.log("Constructed Param String:", payload.Param); 

    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response.data); 
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

const requestData = {
  ClientCode: "ucc0010",
  FirstName: "FirstName",
  MiddleName: "",
  LastName: "LastName",
  TaxStatus: "01",
  Gender: "M",
  DOB: "01/01/1980",
  OccupationCode: "01",
  HoldingNature: "SI",
  Email: "test@test.com",
  CommunicationMode: "P",
  IndianMobileNo: "9999999999",
//   primaryHolderKycType: "C", // KYC Type is required (C for CKYC, P for PAN, etc.)
//   primaryHolderCkycNumber: "123456789012", // Example CKYC Number
  Filler1: "",
  Filler2: "",
};

registerUCC(requestData);
