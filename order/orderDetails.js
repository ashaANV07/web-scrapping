const axios = require("axios");
const xml2js = require("xml2js");

async function getPassword() {
  const url =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";

  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:Action>http://bsestarmf.in/MFOrderEntry/getPassword</wsa:Action>
        <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
    </soap:Header>
    <soap:Body>
        <bses:getPassword>
            <bses:UserId>640501</bses:UserId>
            <bses:Password>Abc@12345</bses:Password>
            <bses:PassKey>abcde1234</bses:PassKey>
        </bses:getPassword>
    </soap:Body>
</soap:Envelope>`;

  try {
    const response = await axios.post(url, soapRequest, {
      headers: {
        "Content-Type": "application/soap+xml",
      },
    });

    const result = await xml2js.parseStringPromise(response.data);

    const passwordResult =
      result["s:Envelope"]["s:Body"][0]["getPasswordResponse"][0][
        "getPasswordResult"
      ][0];

    const password = passwordResult.split("|")[1];
    // console.log("Extracted Password:", password);
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
  console.log("encryptedPassword", encryptedPassword);
  const url =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";

  const payload = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
        <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
    </soap:Header>
    <soap:Body>
        <bses:orderEntryParam>
            <bses:TransCode>NEW</bses:TransCode>
            <bses:TransNo>202406066405000011</bses:TransNo>
            <bses:OrderId/>
            <bses:UserID>640501</bses:UserID>
            <bses:MemberId>6405</bses:MemberId>
            <bses:ClientCode>TG038</bses:ClientCode>
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
            <bses:Password>${encryptedPassword}</bses:Password>
            <bses:PassKey>abcde12345</bses:PassKey>
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
    console.error("Error submitting order:", error.message);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
  }
}

(async () => {
  const encryptedPassword = await getPassword();
  if (encryptedPassword) {
    await submitOrder(encryptedPassword);
  }
})();
