const contactRoutes = require('./contact_routes');
module.exports = function(app, contacts) {
    contactRoutes(app, contacts);
};