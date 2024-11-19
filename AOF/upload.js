const fs = require("fs");
const axios = require("axios");
const { parseString } = require("xml2js");

function pdfToBase64(filePath) {
  try {
    return fs.readFileSync(filePath).toString("base64");
  } catch (error) {
    console.error("Error reading file:", error.message);
    return null;
  }
}

function createSOAPRequest(data) {
  return `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
                       xmlns:tem="http://tempuri.org/"
                       xmlns:bses="http://schemas.datacontract.org/2004/07/StarMFFileUploadService">
            <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                <wsa:Action>http://tempuri.org/IStarMFFileUploadService/UploadFile</wsa:Action>
                <wsa:To>https://bsestarmfdemo.bseindia.com/StarMFFileUploadService/StarMFFileUploadService.svc/Secure</wsa:To>
            </soap:Header>
            <soap:Body>
                <tem:UploadFile>
                    <tem:data>
                        <bses:ClientCode>${data.ClientCode}</bses:ClientCode>
                        <bses:DocumentType>${data.DocumentType}</bses:DocumentType>
                        <bses:EncryptedPassword>${data.EncryptedPassword}</bses:EncryptedPassword>
                        <bses:FileName>${data.FileName}</bses:FileName>
                        <bses:Flag>${data.Flag}</bses:Flag>
                        <bses:MemberCode>${data.MemberCode}</bses:MemberCode>
                        <bses:UserId>${data.UserId}</bses:UserId>
                        <bses:pFileBytes>${data.pFileBytes}</bses:pFileBytes>
                    </tem:data>
                </tem:UploadFile>
            </soap:Body>
        </soap:Envelope>`;
}

async function uploadFile(data) {
  const soapRequest = createSOAPRequest(data);

  try {
    const response = await axios.post(
      "https://bsestarmfdemo.bseindia.com/StarMFFileUploadService/StarMFFileUploadService.svc/Secure",
      soapRequest,
      {
        headers: {
          "Content-Type": "application/soap+xml; charset=utf-8",
        },
      }
    );
    console.log("Response:", response.data);

    parseSOAPResponse(response.data);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
}

// Function to parse SOAP response
function parseSOAPResponse(xml) {
  parseString(xml, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error("Error parsing response:", err);
    } else {
      console.log("Parsed Response:", JSON.stringify(result, null, 2));
    }
  });
}

// Main function to execute the upload
function main() {
  const pdfPath = "./AOF_6405_a0001.tiff";
  const pdfBase64 = pdfToBase64(pdfPath);
//   console.log("pdfBase64", pdfBase64);

  if (!pdfBase64) {
    console.error("Failed to convert PDF to base64.");
    return;
  }

  const requestData = {
    ClientCode: "A0031",
    DocumentType: "NRM",
    EncryptedPassword:
      "bcuW+vPWy0bc4PB+4QWmSFY9t5TOd4t4e0csXpdh2rimRBFIWdKlbw==",
    FileName: "AOF_6405_a0001.tiff",
    Flag: "UCC",
    MemberCode: "6405",
    UserId: "640501",
    pFileBytes: pdfBase64,
  };

  uploadFile(requestData);
}

// Run the script
main();
