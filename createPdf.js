const PDFDocument = require("pdfkit");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

function generateExactPDF(data, res) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 30,
  });

  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  // Helper function to draw box with black border
  function drawBox(x, y, width, height) {
    doc.lineWidth(0.5).rect(x, y, width, height).stroke();
  }

  // Draw main border first
  drawBox(30, 20, 535, 750);

  // Logo section
  drawBox(30, 20, 535, 80);

  // Calculate center position for logo
  const logoWidth = 300;
  const logoHeight = 130;
  const boxWidth = 535;
  const boxHeight = 80;
  const centerX = 30 + (boxWidth - logoWidth) / 2;
  const centerY = 40 + (boxHeight - logoHeight) / 2;

  // Place the logo
  doc.image(path.join(__dirname, "unnamed.png"), centerX, centerY, {
    width: logoWidth,
    height: logoHeight,
  });

  let currentY = 100;

  // Broker/Agent Code section with specific column widths
  drawBox(30, currentY, 535, 20);

  // Define sections for broker code area
  const sections = [
    {
      label: "Broker/Agent Code ARN",
      value: "ARN-12345",
      labelWidth: 130,
      valueWidth: 70,
    },
    { label: "SUB-BROKER", value: "123", labelWidth: 80, valueWidth: 70 },
    { label: "EUIN", value: "E123456", labelWidth: 40, valueWidth: 145 },
  ];

  let currentX = 30;

  // Draw sections
  sections.forEach((section, index) => {
    // Draw vertical line after each complete section (except last)
    if (index < sections.length - 1) {
      doc
        .moveTo(currentX + section.labelWidth + section.valueWidth, currentY)
        .lineTo(
          currentX + section.labelWidth + section.valueWidth,
          currentY + 20
        )
        .stroke();
    }

    // Draw vertical line between label and value
    doc
      .moveTo(currentX + section.labelWidth, currentY)
      .lineTo(currentX + section.labelWidth, currentY + 20)
      .stroke();

    // Add text for label and value
    doc.fontSize(8).font("Helvetica");
    doc.text(section.label, currentX + 5, currentY + 6);
    doc.text(section.value, currentX + section.labelWidth + 5, currentY + 6);

    // Update currentX for next section
    currentX += section.labelWidth + section.valueWidth;
  });

  currentY += 20;

  drawBox(30, currentY, 535, 20);
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Unit Folder Information", 32, currentY + 6);

  currentY += 20;

  // Reset font for the rest of the document
  doc.fontSize(8).font("Helvetica");

  // First Applicant Section
  const labelColumn = 150; // Width for labels

  drawBox(30, currentY, 535, 20);
  // Vertical line after label
  doc
    .moveTo(30 + labelColumn, currentY)
    .lineTo(30 + labelColumn, currentY + 20)
    .stroke();
  doc.text("Name of the First Applicant", 35, currentY + 6);
  doc.text(data.firstApplicant.name, 35 + labelColumn + 5, currentY + 6);

  currentY += 20;

  // PAN, KYC, DOB row
  drawBox(30, currentY, 160, 20);
  drawBox(190, currentY, 70, 20);
  drawBox(260, currentY, 305, 20);
  doc.text("PAN Number: " + data.firstApplicant.pan, 35, currentY + 6);
  doc.text("KYC", 195, currentY + 6);
  doc.text("Date Of Birth: " + data.firstApplicant.dob, 265, currentY + 6);

  currentY += 20;

  // Parents row
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Father Name:", 35, currentY + 6);
  doc.text("Mother Name:", 302, currentY + 6);

  currentY += 20;

  // Guardian row
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Name of Guardian:", 35, currentY + 6);
  doc.text("PAN:", 302, currentY + 6);

  currentY += 20;

  // Contact Address
  drawBox(30, currentY, 535, 20);
  doc.text("Contact Address:", 35, currentY + 6);
  doc.text(data.firstApplicant.address, 120, currentY + 6);

  currentY += 20;

  // City, Pincode, State, Country
  drawBox(30, currentY, 133, 20);
  drawBox(163, currentY, 134, 20);
  drawBox(297, currentY, 133, 20);
  drawBox(430, currentY, 135, 20);
  doc.text("City: " + data.firstApplicant.city, 35, currentY + 6);
  doc.text("Pincode: " + data.firstApplicant.pincode, 168, currentY + 6);
  doc.text("State: " + data.firstApplicant.state, 302, currentY + 6);
  doc.text("Country: " + data.firstApplicant.country, 435, currentY + 6);

  currentY += 20;

  // Contact Details Row 1
  drawBox(30, currentY, 100, 20);
  drawBox(130, currentY, 177, 20);
  drawBox(307, currentY, 258, 20);
  doc.text("Tel.(Off):", 35, currentY + 6);
  doc.text("Tel.(Res): " + data.firstApplicant.phone, 135, currentY + 6);
  doc.text("Email: " + data.firstApplicant.email, 312, currentY + 6);

  currentY += 20;

  // Contact Details Row 2
  drawBox(30, currentY, 100, 20);
  drawBox(130, currentY, 177, 20);
  drawBox(307, currentY, 258, 20);
  doc.text("Fax(Off):", 35, currentY + 6);
  doc.text("Fax(Res):", 135, currentY + 6);
  doc.text("Mobile: " + data.firstApplicant.mobile, 312, currentY + 6);

  currentY += 20;

  // Income & Occupation
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Income Tax Slab/Networth:", 35, currentY + 6);
  doc.text("Occupation Details:", 302, currentY + 6);

  currentY += 20;

  // Birth & Tax Residence
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Place of Birth:", 35, currentY + 6);
  doc.text("Country of Tax Residence:", 302, currentY + 6);

  currentY += 20;

  // Tax ID
  drawBox(30, currentY, 535, 20);
  doc.text("Tax Id No:", 35, currentY + 6);

  currentY += 20;

  // Political Exposure
  drawBox(30, currentY, 535, 30);
  doc.text(
    "Politically exposed person /Related to Politically exposed person etc.?",
    35,
    currentY + 6
  );
  drawBox(350, currentY + 5, 12, 12);
  doc.text("Yes", 365, currentY + 6);
  drawBox(390, currentY + 5, 12, 12);
  doc.text("No", 405, currentY + 6);

  currentY += 30;

  // Mode of Holding & Occupation
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text(
    "Mode of Holding: " + data.firstApplicant.modeOfHolding,
    35,
    currentY + 6
  );
  doc.text("Occupation: " + data.firstApplicant.occupation, 302, currentY + 6);

  currentY += 20;

  // second and third applican secion
  const labelColumn1 = 150; // Width for labels

  drawBox(30, currentY, 535, 20);
  // Vertical line after label
  doc
    .moveTo(30 + labelColumn1, currentY)
    .lineTo(30 + labelColumn1, currentY + 20)
    .stroke();
  doc.text("Name of the Second Applicant", 35, currentY + 6);
  doc.text(data.firstApplicant.name, 35 + labelColumn1 + 5, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 160, 20);
  drawBox(190, currentY, 70, 20);
  drawBox(260, currentY, 305, 20);
  doc.text("PAN Number: " + data.firstApplicant.pan, 35, currentY + 6);
  doc.text("KYC", 195, currentY + 6);
  doc.text("Date Of Birth: " + data.firstApplicant.dob, 265, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Income Tax Slab/Networth:", 35, currentY + 6);
  doc.text("Occupation Details:", 302, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Place of Birth:", 35, currentY + 6);
  doc.text("Country of Tax Residence:", 302, currentY + 6);

  currentY += 20;

  // Tax ID
  drawBox(30, currentY, 535, 20);
  doc.text("Tax Id No:", 35, currentY + 6);

  currentY += 20;

  // Political Exposure
  drawBox(30, currentY, 535, 30);
  doc.text(
    "Politically exposed person /Related to Politically exposed person etc.?",
    35,
    currentY + 6
  );
  drawBox(350, currentY + 5, 12, 12);
  doc.text("Yes", 365, currentY + 6);
  drawBox(390, currentY + 5, 12, 12);
  doc.text("No", 405, currentY + 6);

  currentY += 30;

  //Third Applicant
  const labelColumn2 = 150; // Width for labels

  drawBox(30, currentY, 535, 20);
  // Vertical line after label
  doc
    .moveTo(30 + labelColumn2, currentY)
    .lineTo(30 + labelColumn2, currentY + 20)
    .stroke();
  doc.text("Name of the Third Applicant", 35, currentY + 6);
  doc.text(data.firstApplicant.name, 35 + labelColumn2 + 5, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 160, 20);
  drawBox(190, currentY, 70, 20);
  drawBox(260, currentY, 305, 20);
  doc.text("PAN Number: " + data.firstApplicant.pan, 35, currentY + 6);
  doc.text("KYC", 195, currentY + 6);
  doc.text("Date Of Birth: " + data.firstApplicant.dob, 265, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Income Tax Slab/Networth:", 35, currentY + 6);
  doc.text("Occupation Details:", 302, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Place of Birth:", 35, currentY + 6);
  doc.text("Country of Tax Residence:", 302, currentY + 6);

  currentY += 20;

  // Tax ID
  drawBox(30, currentY, 535, 20);
  doc.text("Tax Id No:", 35, currentY + 6);

  currentY += 20;

  // Political Exposure
  drawBox(30, currentY, 535, 30);
  doc.text(
    "Politically exposed person /Related to Politically exposed person etc.?",
    35,
    currentY + 6
  );
  drawBox(350, currentY + 5, 12, 12);
  doc.text("Yes", 365, currentY + 6);
  drawBox(390, currentY + 5, 12, 12);
  doc.text("No", 405, currentY + 6);

  currentY += 30;

  drawBox(30, currentY, 535, 20);
  doc.text("Other Details of Sole / 1st Applicant", 35, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 535, 20);
  doc.text("Overseas Address(In case of NRI Investor):", 35, currentY + 6);

  currentY += 20;

  drawBox(30, currentY, 160, 20);
  drawBox(190, currentY, 70, 20);
  drawBox(260, currentY, 305, 20);
  doc.text("Ciy: ", 35, currentY + 6);
  doc.text("Pincode:", 195, currentY + 6);
  doc.text("Country: ", 265, currentY + 6);

  currentY += 20;

  doc.addPage();

  // Bank Details Section
  doc.font("Helvetica-Bold").text("Bank Mandate 1 Details", 30, currentY);
  doc.font("Helvetica");

  currentY += 15;

  // Bank Name & Branch
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Name of Bank: " + data.bankDetails.name, 35, currentY + 6);
  doc.text("Branch: " + data.bankDetails.branch, 302, currentY + 6);

  currentY += 20;

  // Account Details
  drawBox(30, currentY, 178, 20);
  drawBox(208, currentY, 178, 20);
  drawBox(386, currentY, 179, 20);
  doc.text("A/C No.: " + data.bankDetails.accountNo, 35, currentY + 6);
  doc.text("A/C Type: " + data.bankDetails.accountType, 213, currentY + 6);
  doc.text("IFSC Code: " + data.bankDetails.ifsc, 391, currentY + 6);

  currentY += 20;

  // Bank Address
  drawBox(30, currentY, 535, 20);
  doc.text("Bank Address: " + data.bankDetails.address, 35, currentY + 6);

  currentY += 20;

  // Bank City, State, Country
  drawBox(30, currentY, 133, 20);
  drawBox(163, currentY, 134, 20);
  drawBox(297, currentY, 133, 20);
  drawBox(430, currentY, 135, 20);
  doc.text("City: " + data.bankDetails.city, 35, currentY + 6);
  doc.text("Pincode:", 168, currentY + 6);
  doc.text("State: " + data.bankDetails.state, 302, currentY + 6);
  doc.text("Country: " + data.bankDetails.country, 435, currentY + 6);

  currentY += 30;

  // Nomination Details
  doc.font("Helvetica-Bold").text("Nomination Details", 30, currentY);
  doc.font("Helvetica");

  currentY += 15;

  // Nominee Name & Relationship
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Nominee Name: " + data.nomineeDetails.name, 35, currentY + 6);
  doc.text(
    "Relationship: " + data.nomineeDetails.relationship,
    302,
    currentY + 6
  );

  currentY += 20;

  // Guardian Name
  drawBox(30, currentY, 535, 20);
  doc.text("Guardian Name(If Nominee is Minor):", 35, currentY + 6);

  currentY += 20;

  // Nominee Address
  drawBox(30, currentY, 535, 20);
  doc.text("Nominee Address:", 35, currentY + 6);

  currentY += 20;

  // Nominee City, Pincode, State
  drawBox(30, currentY, 178, 20);
  drawBox(208, currentY, 178, 20);
  drawBox(386, currentY, 179, 20);
  doc.text("City:", 35, currentY + 6);
  doc.text("Pincode:", 213, currentY + 6);
  doc.text("State:", 391, currentY + 6);

  currentY += 30;

  // Declaration and Signature
  doc.font("Helvetica-Bold").text("Declaration and Signature", 30, currentY);
  doc.font("Helvetica");

  currentY += 15;

  const declaration =
    "I/We confirm that details provided by me/us are true and correct. The ARN holder has disclosed to me/us all the commission (in the form of trail commission or any other mode), payable to him for the different competing Schemes of various Mutual Fund From amongst which the scheme is being recommended to me/us.";
  doc.text(declaration, 30, currentY, { width: 535 });

  currentY += 40;

  // Date and Place
  drawBox(30, currentY, 267, 20);
  drawBox(297, currentY, 268, 20);
  doc.text("Date:", 35, currentY + 6);
  doc.text("Place:", 302, currentY + 6);

  currentY += 30;

  // Signature boxes
  drawBox(30, currentY, 178, 40);
  drawBox(208, currentY, 178, 40);
  drawBox(386, currentY, 179, 40);

  currentY += 45;
  doc.text("1st applicant Signature", 35, currentY);
  doc.text("2nd applicant Signature", 213, currentY);
  doc.text("3rd applicant Signature", 391, currentY);

  doc.end();
}

const sampleData = {
  firstApplicant: {
    name: "PRIYANK PRIYANK MEHTA",
    pan: "APSPM7523B",
    dob: "12-03-1989",
    address: "102, RIVER RESIDENCY, ATHWALINES, B/H.ANJAN SHALAKA,LAL BUNGLOW",
    city: "SURAT",
    pincode: "395007",
    state: "GUJARAT",
    country: "INDIA",
    phone: "9879135124",
    email: "MEHTA_PRIYANK@YMAIL.COM",
    mobile: "9879135124",
    modeOfHolding: "SINGLE",
    occupation: "BUSINESS",
  },
  bankDetails: {
    name: "HDFC BANK",
    branch: "GHOD DOD ROAD",
    accountNo: "50100135485362",
    accountType: "SAVINGS",
    ifsc: "HDFC0001249",
    address: "FIRST FLOOR,SAI MALL,CROSS WAY-1,NEAR RAM CHOWK",
    city: "SURAT",
    state: "GUJARAT",
    country: "INDIA",
  },
  nomineeDetails: {
    name: "RITU PRIYANK MEHTA",
    relationship: "Spouse",
  },
};

app.get("/generate-pdf", (req, res) => {
  generateExactPDF(sampleData, res);
});

app.listen(port, () => {
  console.log(`PDF generator app listening at http://localhost:${port}`);
});
