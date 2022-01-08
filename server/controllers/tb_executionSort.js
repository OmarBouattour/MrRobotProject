const tb_executionSort = require('../modules/tb_executionSort');

exports.getAllTestCases = async (req, res, next) => {
  try {
    const [alltestcases] = await tb_executionSort.fetchAll();
    res.status(200).json(alltestcases);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
