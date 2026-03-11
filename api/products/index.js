const { withErrorHandling, sendJson } = require('../_lib/http');
const { KEYS, productKey, getAllFromSet, getJson } = require('../_lib/repositories');

module.exports = withErrorHandling(async (req, res) => {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const { id, slug, categoryId, featured, search } = req.query;

  if (id) {
    const product = await getJson(productKey(String(id)));
    return sendJson(res, product ? 200 : 404, product ? JSON.parse(product) : { error: 'Not found' });
  }

  let products = await getAllFromSet(KEYS.products, productKey);

  if (slug) {
    const bySlug = products.find((p) => p.slug === slug);
    return sendJson(res, bySlug ? 200 : 404, bySlug || { error: 'Not found' });
  }

  if (categoryId) {
    products = products.filter((product) => product.categoryId === categoryId);
  }

  if (featured === 'true') {
    products = products.filter((product) => Boolean(product.featured));
  }

  if (search) {
    const query = String(search).toLowerCase();
    products = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesTags = Array.isArray(product.tags) && product.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesName || matchesDescription || matchesTags;
    });
  }

  return sendJson(res, 200, products);
});
