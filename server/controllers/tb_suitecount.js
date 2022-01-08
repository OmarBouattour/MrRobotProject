const tb_suite = require('../modules/tb_suitecount');

exports.getAllSuitescount = async (req, res, next) => {
  try {
    const [allsuitescount] = await tb_suite.fetchAll();
    res.status(200).json(allsuitescount);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
