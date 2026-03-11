const { HttpError } = require('./http');

function extractBearerToken(req) {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice('Bearer '.length).trim();
  return token || null;
}

function parseJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  try {
    const decoded = Buffer.from(parts[1], 'base64url').toString('utf8');
    const payload = JSON.parse(decoded);
    if (!payload || typeof payload !== 'object') {
      return null;
    }

    if (payload.exp && (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000))) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function requireAdmin(req) {
  const token = extractBearerToken(req);
  if (!token) {
    throw new HttpError(401, 'Authentication token required');
  }

  const payload = parseJwtPayload(token);
  if (!payload || payload.role !== 'admin') {
    throw new HttpError(403, 'Admin access required');
  }
}

module.exports = {
  requireAdmin,
};
