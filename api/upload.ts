import type { VercelRequest, VercelResponse } from "@vercel/node";

const UPLOAD_UPSTREAM =
  process.env.UPLOAD_UPSTREAM ??
  "https://5wb7jbcjhc.execute-api.us-west-2.amazonaws.com/default/uploadFile";

const COMMON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    Object.entries(COMMON_HEADERS).forEach(([key, value]) =>
      res.setHeader(key, value)
    );
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const upstreamResponse = await fetch(UPLOAD_UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstreamResponse.text();

    Object.entries(COMMON_HEADERS).forEach(([key, value]) =>
      res.setHeader(key, value)
    );
    res
      .status(upstreamResponse.status)
      .setHeader("Content-Type", "application/json")
      .send(text);
  } catch (err: any) {
    Object.entries(COMMON_HEADERS).forEach(([key, value]) =>
      res.setHeader(key, value)
    );
    res.status(500).json({ error: err?.message ?? "Upstream request failed" });
  }
}
