const getErrorResponse = (message, errors) => {
  return {
    success: false,
    message,
    data: {},
    error: {
      details: errors,
    },
  };
};

module.exports = {
  getErrorResponse,
};
