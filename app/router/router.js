module.exports = function (app) {

    const webRoute = require('./webrouting/webRoute');
    app.use(webRoute);

    app.use(function (req, res) {
        res.status(404).json({ error: "Not Found" });
    });
};