// src/api/upload.ts
// Sends any text or JSON result to your Lambda uploadFile → saves it in S3

export async function uploadFile(fileName: string, contentBase64: string) {
  // Allows overriding via Vite env var for production (falls back to current gateway)
  const uploadEndpoint =
    import.meta.env.VITE_UPLOAD_ENDPOINT?.trim() ||
    "https://5wb7jbcjhc.execute-api.us-west-2.amazonaws.com/default/uploadFile";

  const UPLOAD_URL = uploadEndpoint.startsWith("http")
    ? uploadEndpoint
    : uploadEndpoint.startsWith("/")
    ? uploadEndpoint
    : `/${uploadEndpoint}`;

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName,
      contentBase64,
    }),
  });

  if (!response.ok) {
    throw new Error("Upload failed: " + response.status);
  }

  const data = await response.json();
  return data;
}
