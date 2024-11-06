const axios = require("axios");
const crypto = require("crypto");
const moment = require("moment");
const sql = require("mssql");

// MSSQL database configuration
const dbConfig = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "963852",
  server: process.env.DB_SERVER || "192.168.102.120",
//   database: process.env.DB_NAME || "YourDatabaseName",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

// Utility functions (placeholder)
function encryptHDFCMessage(message) {
  return Buffer.from(message).toString("hex");
}

function successResponse(statusCode, message, data) {
  return { statusCode, message, data };
}

function errorResponse(statusCode, message) {
  return { statusCode, message };
}

async function eOnline(request, payload) {
  let pool;
  try {
    const {
      bank_details: ac_no,
      amount: Customer_DebitAmount,
      client_code: clientCode,
      channel,
    } = payload;
    const currentDate = moment();
    const futureDate = currentDate.clone().add(40, "years").subtract(1, "days");

    const todate = currentDate.format("YYYY-MM-DD");
    const end_date = futureDate.format("YYYY-MM-DD");
    const created_at = currentDate.format("YYYY-MM-DD HH:mm:ss");

    const ShortCode = "ASCPL";
    const MerchantCategoryCode = "U099";
    const Customer_SequenceType = "RCUR";
    const Customer_DebitFrequency = "ADHO";

    // Fetching KYC data from external API
    const urlKyc = `http://192.168.102.101:8080/techexcelapi/index.cfm/ClientBankDetailMultiple/ClientBankDetailMultiple1?&Client_id=${clientCode}&UrlUserName=techapi&UrlPassword=techapi@123&UrlDatabase=capsfo&UrlDataYear=${currentDate.format(
      "YYYY"
    )}`;
    const kycResponse = await axios.get(urlKyc);
    const data = kycResponse.data;

    if (!data || data.length === 0) {
      return errorResponse(404, "No data found for the client ID");
    }

    const dataValues = data[0]["DATA"];
    const dfFiltered = dataValues.find((row) => row.BANK_ACNO === ac_no);
    if (!dfFiltered) {
      return errorResponse(400, "Invalid bank number");
    }

    const {
      CLIENT_NAME: Customer_Name,
      IFSC_CODE: Customer_InstructedMemberId,
      MOBILE_NO: Customer_Mobile,
      ACCOUNT_CODE: ref_id,
      BANK_ACNO: Customer_AccountNo,
      BANK_ACCTYPE,
    } = dfFiltered;
    const Filler5 =
      BANK_ACCTYPE.toLowerCase() === "saving"
        ? "S"
        : BANK_ACCTYPE.toLowerCase() === "current"
        ? "C"
        : "0";
    const UtilCode = "NACH00000000000908";

    pool = await sql.connect(dbConfig);
    let MsgId;
    let status = true;

    while (status) {
      MsgId = Math.floor(Math.random() * 1e18).toString();
      const msgExists = await pool
        .request()
        .input("MsgId", sql.VarChar, MsgId)
        .query("SELECT * FROM tbl_e_mandate_detail WHERE MsgId = @MsgId");
      if (!msgExists.recordset.length) status = false;
    }

    const checkSum = `${Customer_AccountNo}|${todate}|${end_date}||${Customer_DebitAmount}`;
    const hashedCheckSum = crypto
      .createHash("sha256")
      .update(checkSum)
      .digest("hex");

    const payloadData = {
      UtilCode: `\\x${encryptHDFCMessage(UtilCode)}`,
      Short_Code: `\\x${encryptHDFCMessage(ShortCode)}`,
      Merchant_Category_Code: MerchantCategoryCode,
      CheckSum: hashedCheckSum,
      MsgId: MsgId,
      Customer_Name: `\\x${encryptHDFCMessage(Customer_Name)}`,
      Customer_EmailId: "",
      Customer_Mobile: `\\x${encryptHDFCMessage(Customer_Mobile)}`,
      Customer_AccountNo: `\\x${encryptHDFCMessage(Customer_AccountNo)}`,
      Customer_StartDate: todate,
      Customer_ExpiryDate: end_date,
      Customer_DebitAmount: "",
      Customer_MaxAmount: Customer_DebitAmount,
      Customer_DebitFrequency: Customer_DebitFrequency,
      Customer_SequenceType: Customer_SequenceType,
      Customer_InstructedMemberId: Customer_InstructedMemberId,
      Customer_Reference1: `\\x${encryptHDFCMessage(ref_id)}`,
      Customer_Reference2: "",
      Channel: channel,
      Filler5: Filler5,
    };

    await pool
      .request()
      .input("client_code", sql.VarChar, clientCode)
      .input("checksum", sql.VarChar, hashedCheckSum)
      .input("account_no", sql.VarChar, Customer_AccountNo)
      .input("MsgId", sql.VarChar, MsgId)
      .input("start_date", sql.VarChar, todate)
      .input("expiry_date", sql.VarChar, end_date)
      .input("debit_amount", sql.Decimal, Customer_DebitAmount)
      .input("debit_frequency", sql.VarChar, Customer_DebitFrequency)
      .input("sequence_type", sql.VarChar, Customer_SequenceType)
      .input("account_type", sql.VarChar, Filler5)
      .input("channel", sql.VarChar, channel)
      .input("created_at", sql.VarChar, created_at)
      .query(
        `INSERT INTO tbl_e_mandate_detail (client_code, checksum, account_no, MsgId, start_date, expiry_date, debit_amount, debit_frequency, sequence_type, account_type, channel, created_at) VALUES (@client_code, @checksum, @account_no, @MsgId, @start_date, @expiry_date, @debit_amount, @debit_frequency, @sequence_type, @account_type, @channel, @created_at)`
      );

    return successResponse(200, "Data fetched successfully", payloadData);
  } catch (error) {
    console.error("Error processing eMandate:", error.stack);
    return errorResponse(500, "Internal Server Error");
  } finally {
    if (pool) {
      await sql.close();
    }
  }
}

module.exports = { eOnline };
