const tb_execution = require('../modules/tb_execution');

exports.getAllExecutions = async (req, res, next) => {
  try {
    const [allexecutions] = await tb_execution.fetchAll();
    res.status(200).json(allexecutions);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
