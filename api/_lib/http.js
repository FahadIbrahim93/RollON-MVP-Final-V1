function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      sendJson(res, 500, {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}

module.exports = {
  sendJson,
  withErrorHandling,
};
