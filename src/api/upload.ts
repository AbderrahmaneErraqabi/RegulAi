// src/api/upload.ts
// Sends any text or JSON result to your Lambda uploadFile → saves it in S3

export async function uploadFile(fileName: string, contentBase64: string) {
  // 🔗 your actual API Gateway link:
  const UPLOAD_URL =
    "https://5wb7jbcjhc.execute-api.us-west-2.amazonaws.com/default/uploadFile";

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