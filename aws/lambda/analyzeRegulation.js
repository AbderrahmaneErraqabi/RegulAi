// aws/lambda/analyzeRegulation.js
// ------------------------------------------------------
// AWS Lambda handler for analyzing a regulation text
// Includes both mock AI summary + financial impact module
// ------------------------------------------------------

const { evaluateRegulatoryImpact } = require("./finance/index.js");
const { getMarketData } = require("./finance/fetchMarketData.js");

// 🧠 Lambda handler
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const text = body.text || "No regulation provided.";

    // 1️⃣ Mock AI part (Badr will later replace this with real AI/NLP)
    const regAnalysis = {
      input_preview: text.slice(0, 80),
      summary:
        "This regulation increases import restrictions on advanced chips, likely raising compliance costs for US semiconductor firms.",
      sectors: ["Semiconductors", "AI Hardware", "Defense"],
      companies_at_risk: [
        { ticker: "NVDA", reason: "Export controls / licensing risk" },
        { ticker: "AMD", reason: "Margin compression if tariffs escalate" },
        { ticker: "INTC", reason: "Supply chain exposure to Asia" },
      ],
      risk_level: "High",
      timestamp: new Date().toISOString(),
    };

    // 2️⃣ Finance impact computation (your part)
    const financeImpact = await evaluateRegulatoryImpact({
      keywords: regAnalysis.sectors,
      affectedSectors: regAnalysis.sectors,
      mentionedTickers: regAnalysis.companies_at_risk.map((c) => c.ticker),
      summary: regAnalysis.summary,
    });

    // 3️⃣ Enrich each ticker with live (or mock) market data
    const enriched = await Promise.all(
      financeImpact.per_ticker.map(async (t) => ({
        ...t,
        market: await getMarketData(t.ticker),
      }))
    );

    // 4️⃣ Combine everything into one final structured response
    const finalResult = {
      ...regAnalysis,
      finance: {
        summary: financeImpact.sector_summary,
        tickers: enriched,
        action: financeImpact.action,
      },
    };

    // ✅ Return JSON response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalResult),
    };
  } catch (err) {
    console.error("❌ Lambda error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Lambda execution failed", details: err.message }),
    };
  }
};