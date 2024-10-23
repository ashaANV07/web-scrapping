const axios = require("axios");
const getPassword = require("./getPassword");

const lumpSumOrder = async () => {
  try {
    // Retrieve the password using your getPassword function
    const passwordFull = await getPassword();
    const password = passwordFull.split("|")[1];

    // Define dynamic variables
    const transCode = "NEW";
    const transNo = "202406186405000004";
    const userId = "640501";
    const memberId = "6405";
    const clientCode = "A0001";
    const schemeCd = "02-DP";
    const buySell = "P";
    const buySellType = "FRESH";
    const dptxn = "C";
    const orderVal = "500";
    const kycStatus = "Y";
    const euinVal = "N";
    const minRedeem = "N";
    const dpc = "Y";
    const passKey = "abcdef1234";

    // Construct the SOAP request payload
    const soapRequest = `
 <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
     <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
         <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
         <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
     </soap:Header>
     <soap:Body>
         <bses:orderEntryParam>
             <bses:TransCode>${transCode}</bses:TransCode>
             <bses:TransNo>${transNo}</bses:TransNo>
             <bses:OrderId/>
             <bses:UserID>${userId}</bses:UserID>
             <bses:MemberId>${memberId}</bses:MemberId>
             <bses:ClientCode>${clientCode}</bses:ClientCode>
             <bses:SchemeCd>${schemeCd}</bses:SchemeCd>
             <bses:BuySell>${buySell}</bses:BuySell>
             <bses:BuySellType>${buySellType}</bses:BuySellType>
             <bses:DPTxn>${dptxn}</bses:DPTxn>
             <bses:OrderVal>${orderVal}</bses:OrderVal>
             <bses:Qty/>
             <bses:AllRedeem>N</bses:AllRedeem>
             <bses:FolioNo/>
             <bses:Remarks/>
             <bses:KYCStatus>${kycStatus}</bses:KYCStatus>
             <bses:RefNo/>
             <bses:SubBrCode/>
             <bses:EUIN/>
             <bses:EUINVal>${euinVal}</bses:EUINVal>
             <bses:MinRedeem>${minRedeem}</bses:MinRedeem>
             <bses:DPC>${dpc}</bses:DPC>
             <bses:IPAdd/>
             <bses:Password>${password}</bses:Password>
             <bses:PassKey>${passKey}</bses:PassKey>
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

    const headers = {
      "Content-Type": "application/soap+xml",
    };

    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure",
      soapRequest,
      { headers }
    );

    console.log("Lump Sum Order Response:", response.data);
  } catch (error) {
    console.error("Error in lump sum order:", error);
  }
};

lumpSumOrder();
