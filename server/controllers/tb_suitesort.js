const tb_suitesort = require('../modules/tb_suitesort');

exports.getAllSuitessort = async (req, res, next) => {
  try {
    const [allsuites] = await tb_suitesort.fetchAll();
    res.status(200).json(allsuites);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
