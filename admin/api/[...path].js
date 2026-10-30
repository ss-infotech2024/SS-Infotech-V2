import { createHmac, timingSafeEqual } from "node:crypto";

export const config = {
  api: { bodyParser: false },
};

const COOKIE_NAME = "ss_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;
const SKIP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "cookie",
  "origin",
  "referer",
  "authorization",
  "x-admin-token",
]);
const SKIP_RESPONSE_HEADERS = new Set([
  "content-encoding",
  "transfer-encoding",
  "content-length",
  "connection",
  "set-cookie",
]);

const DEFAULT_API_BASE_URL = "https://sswebsitebackend.ssinfotech.co.in";

function requestPath(req) {
  return new URL(req.url || "/", "https://admin.local").pathname;
}

function targetUrl(req) {
  const base = String(process.env.API_BASE_URL || DEFAULT_API_BASE_URL)
    .replace(/\/+$/, "")
    .replace(/\/api$/i, "");
  const incoming = new URL(req.url || "/", "https://admin.local");
  return `${base}${incoming.pathname}${incoming.search}`;
}

async function readBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function signSession(expiresAt, secret) {
  return createHmac("sha256", secret).update(String(expiresAt)).digest("base64url");
}

function hasValidSession(req, secret) {
  const cookieHeader = req.headers.cookie || "";
  const value = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (!value) return false;

  const [expiresAtValue, signature] = value.split(".");
  const expiresAt = Number(expiresAtValue);
  if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000) || !signature) {
    return false;
  }

  const expected = Buffer.from(signSession(expiresAt, secret));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function setSessionCookie(res, secret) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const value = `${expiresAt}.${signSession(expiresAt, secret)}`;
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`,
  );
}

function clearSessionCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
  );
}

function sendJson(res, status, payload) {
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const apiBase = process.env.API_BASE_URL || DEFAULT_API_BASE_URL;
  if (!sessionSecret || !process.env.ADMIN_TOKEN || !apiBase) {
    sendJson(res, 500, { success: false, message: "Admin API is not configured." });
    return;
  }

  const path = requestPath(req);
  if (path === "/api/admin/logout") {
    clearSessionCookie(res);
    sendJson(res, 200, { success: true });
    return;
  }

  const isLoginRequest = path === "/api/admin/login" && req.method === "POST";
  if (!isLoginRequest && !hasValidSession(req, sessionSecret)) {
    sendJson(res, 401, { success: false, message: "Your admin session has expired. Please sign in again." });
    return;
  }

  const headers = {};
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (!value || SKIP_REQUEST_HEADERS.has(key.toLowerCase())) continue;
    headers[key] = Array.isArray(value) ? value.join(",") : value;
  }

  let body;
  try {
    body = await readBody(req);

    if (isLoginRequest) {
      const loginResponse = await fetch(targetUrl(req), { method: req.method, headers, body });
      const loginResult = await loginResponse.json().catch(() => ({}));
      if (!loginResponse.ok || !loginResult.success) {
        sendJson(res, loginResponse.status || 401, {
          success: false,
          message: loginResult.message || "Invalid username or password.",
        });
        return;
      }

      setSessionCookie(res, sessionSecret);
      sendJson(res, 200, { success: true });
      return;
    }

    headers["x-admin-token"] = process.env.ADMIN_TOKEN;
    const response = await fetch(targetUrl(req), {
      method: req.method,
      headers,
      body,
    });
    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (!SKIP_RESPONSE_HEADERS.has(key.toLowerCase())) res.setHeader(key, value);
    });
    res.setHeader("Cache-Control", "no-store");
    res.send(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("Admin API proxy error:", error);
    sendJson(res, 502, { success: false, message: "The API could not be reached." });
  }
}
