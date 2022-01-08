const tb_test = require('../modules/tb_test');

exports.getAllTests = async (req, res, next) => {
  try {
    const [alltests] = await tb_test.fetchAll();
    res.status(200).json(alltests);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
