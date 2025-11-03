const { evaluateRegulatoryImpact } = require("./finance");

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

exports.handler = async (event) => {
  if (
    event?.requestContext?.http?.method === "OPTIONS" ||
    event?.httpMethod === "OPTIONS"
  ) {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  try {
    let body = {};
    if (typeof event.body === "string" && event.body.length > 0) {
      body = JSON.parse(event.body);
    } else if (typeof event.body === "object" && event.body !== null) {
      body = event.body;
    }

    const text = body.text || "";
    const sectors = body.sectors || [];
    const tickers = body.tickers || [];
    const summary = body.summary || "";

    // 🧠 Run the real financial impact analysis dynamically
    const financeResult = await evaluateRegulatoryImpact({
      text,
      sectors,
      tickers,
      summary,
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(financeResult),
    };
  } catch (err) {
    console.error("❌ Error in analyzeRegulation Lambda:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
