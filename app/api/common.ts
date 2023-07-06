import { NextRequest } from "next/server";

const OPENAI_URL = "region-9.seetacloud.com:39485";
const DEFAULT_PROTOCOL = "http";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {
  const bodyString = await req.text();
  const bodyJSON = JSON.parse(bodyString);
  const openaiPath = req.headers.get("path");

  console.log("[RequestPath] ", `${PROTOCOL}://${BASE_URL}/${openaiPath}`);
  console.log("[RequestBody]", bodyJSON);

  return fetch(`${PROTOCOL}://${BASE_URL}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: req.method,
    body: JSON.stringify(bodyJSON),
  });
}

export async function requestDocs(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");

  console.log("[requestDocs] ", `${PROTOCOL}://${BASE_URL}/${openaiPath}`);

  return fetch(`${PROTOCOL}://${BASE_URL}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: req.method,
    body: req.body,
    cache: "no-store",
  });
}
