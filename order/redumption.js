const axios = require("axios");

async function getPassword() {
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFWebService/StarMFWebService.svc/getPassword/640501/6405/Abc@12345/qwerty852"
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

async function getRedumption() {
  const url =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";

  const playload = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
 <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
 <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
 <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
 </soap:Header>
 <soap:Body>
    <bses:orderEntryParam>
       <bses:TransCode>NEW</bses:TransCode>
       <bses:TransNo>2024061834050000001</bses:TransNo>
       <bses:OrderId></bses:OrderId>
       <bses:UserID>640501</bses:UserID>
       <bses:MemberId>6405</bses:MemberId>
       <bses:ClientCode>ucc04</bses:ClientCode>
       <bses:SchemeCd>02-DP</bses:SchemeCd>
       <bses:BuySell>R</bses:BuySell>
       <bses:BuySellType>FRESH</bses:BuySellType>
       <bses:DPTxn>P</bses:DPTxn>
       <bses:OrderVal></bses:OrderVal>
       <bses:Qty>1000</bses:Qty>
       <bses:AllRedeem>N</bses:AllRedeem>
       <bses:FolioNo>123456/78</bses:FolioNo>
       <bses:Remarks></bses:Remarks>
       <bses:KYCStatus>Y</bses:KYCStatus>
       <bses:RefNo></bses:RefNo>
       <bses:SubBrCode></bses:SubBrCode>
       <bses:EUIN></bses:EUIN>
       <bses:EUINVal>N</bses:EUINVal>
       <bses:MinRedeem>N</bses:MinRedeem>
       <bses:DPC>Y</bses:DPC>
       <bses:IPAdd></bses:IPAdd>
       <bses:Password>bcuW+vPWy0bc4PB+4QWmSCeOpF8pLq8pg5vHmK7LfX1iSwRg8oqSlQ==</bses:Password>
       <bses:PassKey>abcdef1234</bses:PassKey>
       <bses:Parma1></bses:Parma1>
       <bses:Param2></bses:Param2>
       <bses:Param3>1234567890</bses:Param3>
       <bses:MobileNo>9082738657</bses:MobileNo>
       <bses:EmailID></bses:EmailID>
       <bses:MandateID></bses:MandateID>
       <bses:Filler1></bses:Filler1>
       <bses:Filler2></bses:Filler2>
       <bses:Filler3></bses:Filler3>
       <bses:Filler4></bses:Filler4>
       <bses:Filler5></bses:Filler5>
       <bses:Filler6></bses:Filler6>
    </bses:orderEntryParam>
 </soap:Body>
</soap:Envelope>`;
  try {
    const response = await axios.post(url, playload, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Error in Getare Order Password:", error.message);
  }
}
