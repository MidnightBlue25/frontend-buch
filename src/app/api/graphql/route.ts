import https from "https";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const CERT_PATH = path.resolve("src/certs/certificate.crt");  // 证书路径
const ca = fs.readFileSync(CERT_PATH); // 读取证书

export async function POST(req: Request) {
  const body = await req.text();

  const agent = new https.Agent({
    ca, // 使用自签名证书，而不是关闭验证！
  });

  const response = await fetch("https://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    agent,
  });

  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
