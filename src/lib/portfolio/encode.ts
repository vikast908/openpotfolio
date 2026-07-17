import type { PortfolioConfig } from "./types";

function toB64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = typeof btoa !== "undefined" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = typeof atob !== "undefined" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function encodeConfig(config: PortfolioConfig): string {
  const json = JSON.stringify(config);
  return toB64Url(new TextEncoder().encode(json));
}

export function decodeConfig(encoded: string): PortfolioConfig | null {
  try {
    const bytes = fromB64Url(encoded);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as PortfolioConfig;
  } catch {
    return null;
  }
}

export function readHashConfig(): PortfolioConfig | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  const params = new URLSearchParams(hash);
  const c = params.get("c");
  if (!c) return null;
  return decodeConfig(c);
}

export function buildShareUrl(config: PortfolioConfig): string {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  return `${base}/build/${config.templateId}#c=${encodeConfig(config)}`;
}