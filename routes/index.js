
module.exports = (app) => {
    app.use(`/api/v${process.env.API_VERSION}`, require('./auth'));
    app.use(`/api/v${process.env.API_VERSION}`, require('./user') );
    app.use(`/api/v${process.env.API_VERSION}`, require('./shipments') );
    app.use(`/api/v${process.env.API_VERSION}`, require('./parcels') );
};