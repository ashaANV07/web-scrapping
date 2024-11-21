const axios = require("axios");
const xml2js = require("xml2js");

const getPassword = async () => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
            <wsa:Action>http://bsestarmf.in/MFOrderEntry/getPassword</wsa:Action>
            <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
        </soap:Header>
        <soap:Body>
            <bses:getPassword>
                <bses:UserId>640501</bses:UserId>
                <bses:Password>Abc@0707</bses:Password>
                <bses:PassKey>abcdef1234</bses:PassKey>
            </bses:getPassword>
        </soap:Body>
    </soap:Envelope>`;

  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure",
      soapRequest,
      {
        headers: {
          "Content-Type": "application/soap+xml;charset=UTF-8",
          Accept: "text/xml",
        },
      }
    );

    const result = await xml2js.parseStringPromise(response.data);

    const passwordResult =
      result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
        "getPasswordResult"
      ][0];

    const extractedPassword = passwordResult.split("|")[1];
    console.log("Extracted Password:", extractedPassword);
    return extractedPassword;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getPurchaseOrder = async () => {
  const password = await getPassword();
  const data = {
    useId: "640501",
    memberId: "6405",
    password: "Abc@0707",
    clientCode: "ucc01",
    schemeCode: "02-DP",
  };
  const soapRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
   <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
   <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
   </soap:Header>
   <soap:Body>
      <bses:orderEntryParam>
         <!--Optional:-->
         <bses:TransCode>NEW</bses:TransCode>
         <!--Optional:-->
         <bses:TransNo>202211181099600001</bses:TransNo>
         <!--Optional:-->
         <bses:OrderId></bses:OrderId>
         <!--Optional:-->	
         <bses:UserID>${data.useId}</bses:UserID>
         <!--Optional:-->
         <bses:MemberId>${data.memberId}</bses:MemberId>
         <!--Optional:-->
         <bses:ClientCode>${data.clientCode}</bses:ClientCode>
         <!--Optional:-->
         <bses:SchemeCd>${data.schemeCode}</bses:SchemeCd>
         <!--Optional:-->
         <bses:BuySell>P</bses:BuySell>
         <!--Optional:-->
         <bses:BuySellType>FRESH</bses:BuySellType>
         <!--Optional:-->
         <bses:DPTxn>P</bses:DPTxn>
         <!--Optional:-->
         <bses:OrderVal>2000</bses:OrderVal>
         <!--Optional:-->
         <bses:Qty></bses:Qty>
         <!--Optional:-->
         <bses:AllRedeem>N</bses:AllRedeem>
         <!--Optional:-->
         <bses:FolioNo></bses:FolioNo>
         <!--Optional:-->
         <bses:Remarks></bses:Remarks>
         <!--Optional:-->
         <bses:KYCStatus>Y</bses:KYCStatus>
         <!--Optional:-->
         <bses:RefNo></bses:RefNo>
         <!--Optional:-->
         <bses:SubBrCode>12345</bses:SubBrCode>
         <!--Optional:-->
         <bses:EUIN></bses:EUIN>
         <!--Optional:-->
         <bses:EUINVal>N</bses:EUINVal>
         <!--Optional:-->
         <bses:MinRedeem>N</bses:MinRedeem>
         <!--Optional:-->
         <bses:DPC>Y</bses:DPC>
         <!--Optional:-->
         <bses:IPAdd></bses:IPAdd>
         <!--Optional:-->
         <bses:Password>${password}</bses:Password>
         <!--Optional:-->
         <bses:PassKey>@12345</bses:PassKey>
         <!--Optional:-->
         <bses:Parma1></bses:Parma1>
         <!--Optional:-->
         <bses:Param2></bses:Param2>
         <!--Optional:-->
         <bses:Param3></bses:Param3>
         <!--Optional:-->
         <bses:MobileNo></bses:MobileNo>
         <!--Optional:-->
         <bses:EmailID></bses:EmailID>
         <!--Optional:-->
         <bses:MandateID></bses:MandateID>
         <!--Optional:-->
         <bses:Filler1></bses:Filler1>
         <!--Optional:-->
         <bses:Filler2></bses:Filler2>
         <!--Optional:-->
         <bses:Filler3></bses:Filler3>
         <!--Optional:-->
         <bses:Filler4></bses:Filler4>
         <!--Optional:-->
         <bses:Filler5></bses:Filler5>
         <!--Optional:-->
         <bses:Filler6></bses:Filler6>
      </bses:orderEntryParam>
   </soap:Body>
</soap:Envelope>`;
  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure",
      soapRequest,
      {
        headers: {
          "Content-Type": "application/soap+xml;charset=UTF-8",
          Accept: "text/xml",
        },
      }
    );
    console.log("response", response.data);
  } catch (error) {
    console.log("Error", error);
  }
};

getPurchaseOrder();
