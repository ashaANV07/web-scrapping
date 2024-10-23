const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

function parseDataFromFile() {
  const filePath = path.join(__dirname, "public", "data.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line.trim());

  // Extract the header and data
  const header = lines[0].split("|");
  const data = lines.slice(1).map((line) => {
    const values = line.split("|");
    let record = {};
    header.forEach((key, index) => {
      record[key.trim()] = values[index] ? values[index].trim() : "";
    });
    return record;
  });

  const filteredData = data.filter(
    (record) =>
      record["Scheme Plan"] !== "DIRECT" || record["Scheme Type"] !== "DIRECT"
  );

  filteredData.forEach((record) => {
    console.log("Scheme Type:", record["Scheme Type"]);
  });

  return filteredData;
}

app.get("/api/data", (req, res) => {
  try {
    const data = parseDataFromFile();
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    res.status(500).json({ success: false, message: "Error retrieving data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
