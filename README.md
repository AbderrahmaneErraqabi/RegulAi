# ⚖️ RegulAI — Turning Regulation into Financial Strategy  

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://regul-ai.vercel.app/)
[![AWS](https://img.shields.io/badge/Powered%20by-AWS%20Bedrock-orange?logo=amazonaws)](https://aws.amazon.com/bedrock/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌍 Overview  

**RegulAI** is an AI-powered financial intelligence platform that interprets regulatory texts and quantifies their impact on global markets.  
It uses **AWS Bedrock (Claude 3 Haiku)** for language understanding and a custom **financial Lambda** to identify affected sectors, companies, and risk exposure — turning regulation into investment strategy.  

🚀 **Live Demo:** [regul-ai.vercel.app](https://regul-ai.vercel.app)  
🧠 **Built for:** PolyFinances Datathon 2025  

---

## ✨ Features  

- 🧩 **AI-Powered Legal Analysis** — Automatically summarizes and extracts key sectors, companies, and risks.  
- 💹 **Financial Exposure Mapping** — Calculates risk across S&P 500 tickers using market data.  
- ⚙️ **Actionable Insights** — Generates sector-level recommendations for portfolio adjustments.  
- ☁️ **Serverless Cloud Architecture** — Fully hosted on **AWS Lambda + API Gateway + Bedrock**, with a React frontend on **Vercel**.  
- 💾 **S3 Report Storage** — Exports complete JSON reports for documentation and auditing.

---

## 🏗️ Architecture  
**Workflow:**  
1. User pastes or uploads regulatory text.  
2. The AI Lambda (Claude 3 Haiku) extracts sectors, companies, and risk level.  
3. The Finance Lambda runs exposure analysis for relevant tickers.  
4. Results are merged, visualized, and saved to S3.

---

## 🖥️ Tech Stack  

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, ShadCN UI, Framer Motion |
| **Backend** | AWS Lambda (Node.js 20 & Python 3.11), AWS Bedrock, Yahoo Finance API |
| **Cloud Services** | API Gateway, S3, CloudWatch |
| **Deployment** | Vercel (frontend) + AWS (backend) |

---
