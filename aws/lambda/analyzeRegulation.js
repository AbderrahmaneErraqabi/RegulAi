const { evaluateRegulatoryImpact } = require("./finance");

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(financeResult),
    };
  } catch (err) {
    console.error("❌ Error in analyzeRegulation Lambda:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};