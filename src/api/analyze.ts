// src/api/analyze.ts
// Function that sends regulation text to your AWS Lambda analyzeRegulation endpoint

export async function analyzeRegulation(text: string) {
  // 🔗 Replace this URL with your actual AWS API Gateway endpoint if different
  const API_URL =
    "https://5ot1hwr9uf.execute-api.us-west-2.amazonaws.com/default/analyzeRegulation";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Failed to analyze regulation: ${response.status}`);
  }

  const data = await response.json();
  return data;
}