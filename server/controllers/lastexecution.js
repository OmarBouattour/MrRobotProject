const lastexecution = require('../modules/lastexecution');

exports.getExecution = async (req, res, next) => {
  try {
    const [allexecutions] = await lastexecution.fetchAll();
    res.status(200).json(allexecutions);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
