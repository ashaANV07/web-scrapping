// const axios = require("axios");
// const xml2js = require("xml2js");
// const getOrderPassword = require("./getOrderPassword");

// const orderDetails = async (encryptedPassword) => {
//   const jsonRequestBody = {
//     ClientCode: "A0001",
//     Filler1: "",
//     Filler2: "",
//     Filler3: "",
//     FromDate: "10/06/2002",
//     MemberCode: "6405",
//     OrderNo: "",
//     OrderStatus: "All",
//     OrderType: "All",
//     Password: encryptedPassword,
//     SettType: "ALL",
//     SubOrderType: "All",
//     ToDate: "28/10/2024",
//     TransType: "",
//     UserId: "640501",
//   };
//   console.log("GFVXHFDVFHJDF");
//   try {
//     const response = await axios.post(
//       "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/OrderStatus",
//       jsonRequestBody,
//       {
//         headers: {
//           "Content-Type": "text/xml;charset=UTF-8",
//         },
//       }
//     );
//     console.log("response", response);
//     const parsedResponse = await xml2js.parseStringPromise(response.data);
//     console.log("Order Status Response:", parsedResponse);
//   } catch (error) {
//     console.log("Order Error:", error);
//   }
// };

// (async () => {
//   const encryptedPassword = await getOrderPassword();
//   console.log("encryptedPassword", encryptedPassword);
//   if (encryptedPassword) {
//     await orderDetails(encryptedPassword);
//   }
// })();

const axios = require("axios");
const xml2js = require("xml2js");

async function getPassword() {
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/getPassword/640501/6405/Abc@12345/abcdef1234"
    );

    console.log("Raw Response Data:", response.data);

    const password = response.data.split("|")[1];
    console.log("Extracted Password:", password);

    return password;
  } catch (error) {
    console.error("Error in Getare Order Password:", error.message);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
      console.error("Response Headers:", error.response.headers);
    }
  }
}

async function submitOrder(encryptedPassword) {
  const url =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";
  //   const transCode = "NEW";
  //   const transNo = "202406186405000004";
  //   const userId = "640501";
  //   const memberId = "6405";
  //   const clientCode = "A0001";
  //   const schemeCd = "02-DP";
  //   const buySell = "P";
  //   const buySellType = "FRESH";
  //   const dptxn = "C";
  //   const orderVal = "500";
  //   const kycStatus = "Y";
  //   const euinVal = "N";
  //   const minRedeem = "N";
  //   const dpc = "Y";
  //   const passKey = "abcdef1234";

  const payload = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
        <wsa:To>${url}</wsa:To>
      </soap:Header>
      <soap:Body>
        <bses:orderEntryParam>
            <bses:TransCode>NEW</bses:TransCode>
            <bses:TransNo>202406066405000001</bses:TransNo>
            <bses:OrderId/>
            <bses:UserID>640501</bses:UserID>
            <bses:MemberId>6405</bses:MemberId>
            <bses:ClientCode>TG0238</bses:ClientCode>
            <bses:SchemeCd>02-DP</bses:SchemeCd>
            <bses:BuySell>P</bses:BuySell>
            <bses:BuySellType>FRESH</bses:BuySellType>
            <bses:DPTxn>P</bses:DPTxn>
            <bses:OrderVal>500</bses:OrderVal>
            <bses:Qty/>
            <bses:AllRedeem>N</bses:AllRedeem>
            <bses:FolioNo/>
            <bses:Remarks/>
            <bses:KYCStatus>Y</bses:KYCStatus>
            <bses:RefNo/>
            <bses:SubBrCode/>
            <bses:EUIN/>
            <bses:EUINVal>N</bses:EUINVal>
            <bses:MinRedeem>N</bses:MinRedeem>
            <bses:DPC>Y</bses:DPC>
            <bses:IPAdd/>
            <bses:Password>H7iv7xr9gExOPszkDM6nd02b1lCp06eTBCAw0AnckPWBlNtab6hfoRdjMiuxbDLv</bses:Password>
            <bses:PassKey>abcdef1234</bses:PassKey>
            <bses:Parma1/>
            <bses:Param2/>
            <bses:Param3/>
            <bses:MobileNo/>
            <bses:EmailID/>
            <bses:MandateID/>
            <bses:Filler1/>
            <bses:Filler2/>
            <bses:Filler3/>
            <bses:Filler4/>
            <bses:Filler5/>
            <bses:Filler6/>
        </bses:orderEntryParam>
      </soap:Body>
    </soap:Envelope>`;

  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/soap+xml" },
    });
    console.log("Order Entry Response:", response.data);
  } catch (error) {
    console.error("Error submitting order:", error);
  }
}

(async () => {
  const password = await getPassword();
  await submitOrder(password);
})();
