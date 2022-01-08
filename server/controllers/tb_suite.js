const tb_suite = require('../modules/tb_suite');

exports.getAllSuites = async (req, res, next) => {
  try {
    const [allsuites] = await tb_suite.fetchAll();
    res.status(200).json(allsuites);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
