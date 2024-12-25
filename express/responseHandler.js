module.exports = (res, result) => {
  try {
    if (result.error) {
      throw result.error;
    }
    return res.send({
      status: 200,
      data: result.data,
      error: {},
    });
  } catch (error) {
    return res.send({
      status: 400,
      data: {},
      error: error,
    });
  }
};
