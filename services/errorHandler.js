
const errStatus = require('./errStatus');

module.exports = (app) => {
    app.use(function(err, req, res, next) {
        res.locals.error = req.app.get ('env') === 'development' ? err : {};
        res.status(err.status || 200);
        var stack = (process.env.DEBUG == "true") ? err.stack : "";
        res.json(Object.assign(req.base, {
            result: false,
            status: err.message,
            message: errStatus[err.message],
            stack
        }));
    });
}