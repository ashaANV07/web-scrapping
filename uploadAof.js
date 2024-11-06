const axios = require("axios");
const sharp = require("sharp");
const pdf = require("pdf-poppler");
const fs = require("fs");
const path = require("path");

// Convert PDF to Base64 TIFF
async function pdfToBase64Tiff(pdfPath) {
  try {
    const outputDir = path.join(__dirname, "output");
    fs.mkdirSync(outputDir, { recursive: true }); // Create output directory if not exists

    // Convert PDF pages to PNG images
    const options = {
      format: "png",
      out_dir: outputDir,
      out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
      page: null, // Convert all pages
    };

    await pdf.convert(pdfPath, options);

    // Read all the generated PNG files
    const imageFiles = fs
      .readdirSync(outputDir)
      .filter((file) => file.endsWith(".png"));

    // Convert PNGs to TIFF using sharp and return Base64 string
    const images = [];
    for (const file of imageFiles) {
      const imgBuffer = await sharp(path.join(outputDir, file))
        .tiff({ compression: "deflate" }) // Convert to TIFF format
        .toBuffer();
      images.push(imgBuffer);
    }

    if (images.length > 0) {
      // Combine images into a single TIFF
      const tiffBuffer = await sharp(images[0])
        .tiff({ compression: "deflate" })
        .composite(images.slice(1).map((input) => ({ input })))
        .toBuffer();

      const base64Tiff = tiffBuffer.toString("base64");

      // Clean up the temporary image files
      fs.rmSync(outputDir, { recursive: true, force: true });
      return base64Tiff;
    }
  } catch (error) {
    console.error("Error converting PDF to Base64 TIFF:", error);
    return null;
  }
}

// Make GetPassword API Request
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

// Make the SOAP request for file upload
async function uploadFile(base64Tiff, password) {
  const url =
    "https://bsestarmfdemo.bseindia.com/StarMFFileUploadService/StarMFFileUploadService.svc/Secure";

  const payload = `
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/" xmlns:bses="http://schemas.datacontract.org/2004/07/StarMFFileUploadService">
        <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
            <wsa:Action>http://tempuri.org/IStarMFFileUploadService/UploadFile</wsa:Action>
            <wsa:To>https://bsestarmfdemo.bseindia.com/StarMFFileUploadService/StarMFFileUploadService.svc/Secure</wsa:To>
        </soap:Header>
        <soap:Body>
            <tem:UploadFile>
                <tem:data>
                    <bses:ClientCode>ucc0002</bses:ClientCode>
                    <bses:DocumentType>NRM</bses:DocumentType>
                    <bses:EncryptedPassword>${password}</bses:EncryptedPassword>
                    <bses:FileName>AOF_6405_a0001.tiff</bses:FileName>
                    <bses:Filler1></bses:Filler1>
                    <bses:Filler2></bses:Filler2>
                    <bses:Flag>UCC</bses:Flag>
                    <bses:MemberCode>6405</bses:MemberCode>
                    <bses:UserId>640501</bses:UserId>
                    <bses:pFileBytes>${base64Tiff}</bses:pFileBytes>
                </tem:data>
            </tem:UploadFile>
        </soap:Body>
    </soap:Envelope>`;

  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/soap+xml" },
    });

    console.log("SOAP Response:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

// Main function to run the process
async function main() {
  const pdfPath = path.resolve(__dirname, "AOF_6405_a0001.pdf");
  const base64Tiff = await pdfToBase64Tiff(pdfPath);

  if (base64Tiff) {
    const password = await getPassword();
    if (password) {
      await uploadFile(base64Tiff, password);
    }
  }
}

main();
