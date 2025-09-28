// Simple Base64 encoder
const base64url = (source) => {
  let encoded = btoa(JSON.stringify(source)); // standard base64
  return encoded.replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_"); // JWT style
};

export const generateMockJWT = (user) => {
  const header = { alg: "HS256", typ: "JWT" };

  const payload = {
    sub: user.username || "dev_user",
    name: user.username || "Developer Userrr",
    email: user.email || "dev@example.com",
    role: user.role || "tester",
    iat: Math.floor(Date.now() / 1000), // issued at
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h expiry
  };

  const encodedHeader = base64url(header);
  const encodedPayload = base64url(payload);

  // Signature is mock since we’re not signing with a secret
  const signature = "mock_signature";

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
