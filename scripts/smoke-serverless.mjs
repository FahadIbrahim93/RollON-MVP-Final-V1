import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function fakeRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

process.env.RollON_Database_KV_REST_API_URL = 'https://example.invalid';
process.env.RollON_Database_KV_REST_API_TOKEN = 'token';
process.env.ROLLON_ADMIN_SEED_TOKEN = 'seed-token';

const responses = {
  PING: { result: 'PONG' },
  SMEMBERS_PRODUCTS: { result: ['1'] },
  JSON_PRODUCT_1: { result: JSON.stringify({ id: '1', name: 'Product One', description: 'd', categoryId: '2', featured: true, tags: ['a'] }) },
};

global.fetch = async (url, init) => {
  const body = JSON.parse(init.body);
  const isPipeline = String(url).endsWith('/pipeline');

  if (isPipeline) {
    const results = body.map((cmd) => {
      if (cmd[0] === 'JSON.GET' && cmd[1] === 'rollon:product:1') return { result: responses.JSON_PRODUCT_1.result };
      return { result: 'OK' };
    });
    return { ok: true, json: async () => results };
  }

  if (body[0] === 'PING') return { ok: true, json: async () => responses.PING };
  if (body[0] === 'SMEMBERS' && body[1] === 'rollon:idx:products') return { ok: true, json: async () => responses.SMEMBERS_PRODUCTS };
  if (body[0] === 'JSON.GET' && body[1] === 'rollon:product:1') return { ok: true, json: async () => responses.JSON_PRODUCT_1 };

  return { ok: true, json: async () => ({ result: null }) };
};

const health = require('../api/health.js');
const products = require('../api/products/index.js');
const orders = require('../api/orders/index.js');

const healthRes = fakeRes();
await health({ method: 'GET', query: {}, headers: {} }, healthRes);
console.log('GET /api/health ->', healthRes.statusCode, JSON.stringify(healthRes.body));

const productsRes = fakeRes();
await products({ method: 'GET', query: { featured: 'true', page: '1', limit: '20' }, headers: {} }, productsRes);
console.log('GET /api/products?featured=true ->', productsRes.statusCode, JSON.stringify(productsRes.body));

const invalidOrderRes = fakeRes();
await orders({ method: 'POST', query: {}, headers: {}, body: { customerId: 'c1', items: [] } }, invalidOrderRes);
console.log('POST /api/orders invalid payload ->', invalidOrderRes.statusCode, JSON.stringify(invalidOrderRes.body));

const validOrderRes = fakeRes();
await orders(
  {
    method: 'POST',
    query: {},
    headers: {},
    body: {
      customerId: 'c1',
      customerName: 'Test Customer',
      total: 150,
      items: [{ name: 'Product One', quantity: 1, price: 150, image: '/i.png' }],
      shippingAddress: { name: 'Test', address: 'Dhaka', city: 'Dhaka', phone: '0123' },
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status: 'pending',
    },
  },
  validOrderRes,
);
console.log('POST /api/orders valid payload ->', validOrderRes.statusCode, JSON.stringify({ orderNumber: validOrderRes.body?.orderNumber, id: validOrderRes.body?.id }));
