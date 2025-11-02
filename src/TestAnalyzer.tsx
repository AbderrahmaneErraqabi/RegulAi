import { useState } from "react";
import { analyzeRegulation } from "./api/analyze";
import { uploadFile } from "./api/upload";

export default function TestAnalyzer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

async function handleAnalyze() {
  setLoading(true);
  setSaved(false);

  try {
    // 1️⃣ Send text to AWS analyzeRegulation
    const analysis = await analyzeRegulation(input);

    // 2️⃣ Show result on screen
    setResult(analysis);
    console.log("Analysis finished, preparing upload...");

    // 3️⃣ Convert result to Base64 for S3
    const fileName = `analysis-${Date.now()}.json`;
    const contentBase64 = btoa(JSON.stringify(analysis, null, 2));

    // 4️⃣ Upload to S3 through your uploadFile API
    console.log("Starting upload to S3…");
    console.log("About to call uploadFile API...");
    const uploadResponse = await uploadFile(fileName, contentBase64);
    console.log("Upload finished:", uploadResponse);
    console.log("Upload response:", uploadResponse);

    // 5️⃣ Optional visual confirmation
    setSaved(true);
  } catch (err) {
    console.error(err);
    alert("Error during analysis or upload");
  }

  setLoading(false);
}

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#f1f1f1",
        padding: "20px",
        borderRadius: "10px",
        width: "500px",
        margin: "50px auto",
        fontFamily: "monospace",
      }}
    >
      <h2>Analyse Réglementaire (Test)</h2>

      <textarea
        placeholder="Colle ici un texte réglementaire..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          background: "#00c896",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyse en cours..." : "Analyser"}
      </button>

      {result && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Résumé :</h3>
          <p>{result.summary}</p>

          <h3>Secteurs :</h3>
          <ul>
            {result.sectors.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3>Entreprises à risque :</h3>
          <ul>
            {result.companies_at_risk.map((c: any, i: number) => (
              <li key={i}>
                <b>{c.ticker}</b> — {c.reason}
              </li>
            ))}
          </ul>

          <p>
            <b>Niveau de risque :</b> {result.risk_level}
          </p>
          {/* ✅ Add the green confirmation message below */}
    {saved && (
      <p style={{ color: "#00c896", fontWeight: "bold", marginTop: "10px" }}>
        ✔ Result saved to S3 successfully!
      </p>
    )}
        </div>
      )}
    </div>
  );
}
