const { withErrorHandling, sendJson } = require('../_lib/http');
const { KEYS, orderKey, getAllFromSet, getJson, createOrder } = require('../_lib/repositories');

module.exports = withErrorHandling(async (req, res) => {
  if (req.method === 'GET') {
    if (req.query.id) {
      const order = await getJson(orderKey(String(req.query.id)));
      return sendJson(res, order ? 200 : 404, order ? JSON.parse(order) : { error: 'Not found' });
    }

    const orders = await getAllFromSet(KEYS.orders, orderKey);
    return sendJson(res, 200, orders);
  }

  if (req.method === 'POST') {
    const payload = req.body;
    if (!payload || !payload.customerId || !payload.customerName || !Array.isArray(payload.items)) {
      return sendJson(res, 400, { error: 'Invalid order payload' });
    }

    const order = await createOrder(payload);
    return sendJson(res, 201, order);
  }

  return sendJson(res, 405, { error: 'Method not allowed' });
});
