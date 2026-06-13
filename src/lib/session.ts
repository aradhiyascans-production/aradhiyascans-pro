const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: any, secret: string): Promise<string> {
  const dataStr = JSON.stringify(payload);
  const dataBuffer = encoder.encode(dataStr);
  const cryptoKey = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, dataBuffer);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  const payloadBase64 = btoa(unescape(encodeURIComponent(dataStr)));
  return `${payloadBase64}.${signatureHex}`;
}

export async function verifySession(token: string, secret: string): Promise<any | null> {
  try {
    const [payloadBase64, signatureHex] = token.split(".");
    if (!payloadBase64 || !signatureHex) return null;
    
    const dataStr = decodeURIComponent(escape(atob(payloadBase64)));
    const dataBuffer = encoder.encode(dataStr);
    
    const matched = signatureHex.match(/.{1,2}/g);
    if (!matched) return null;
    const sigBytes = new Uint8Array(matched.map(byte => parseInt(byte, 16)));
    
    const cryptoKey = await getCryptoKey(secret);
    const isValid = await crypto.subtle.verify("HMAC", cryptoKey, sigBytes, dataBuffer);
    if (!isValid) return null;
    
    const payload = JSON.parse(dataStr);
    if (payload.expiresAt < Date.now()) {
      console.warn("[session] Token has expired.");
      return null;
    }
    
    return payload;
  } catch (err) {
    console.error("[session] Session verification error:", err);
    return null;
  }
}
