const crypto = require('node:crypto');
const { HttpError } = require('./http');

function extractBearerToken(req) {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice('Bearer '.length).trim();
  return token || null;
}

function decodeBase64UrlJson(input) {
  try {
    const decoded = Buffer.from(input, 'base64url').toString('utf8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function verifyHs256Signature(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = decodeBase64UrlJson(encodedHeader);
  if (!header || header.alg !== 'HS256' || header.typ !== 'JWT') {
    return null;
  }

  const payload = decodeBase64UrlJson(encodedPayload);
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const data = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('base64url');

  const actualBuffer = Buffer.from(encodedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (actualBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  if (payload.exp && (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000))) {
    return null;
  }

  return payload;
}

function requireAdmin(req) {
  const token = extractBearerToken(req);
  if (!token) {
    throw new HttpError(401, 'Authentication token required');
  }

  const secret = process.env.ROLLON_JWT_SECRET;
  if (!secret) {
    throw new HttpError(500, 'ROLLON_JWT_SECRET is not configured');
  }

  const payload = verifyHs256Signature(token, secret);
  if (!payload || payload.role !== 'admin') {
    throw new HttpError(403, 'Admin access required');
  }
}

module.exports = {
  requireAdmin,
};
