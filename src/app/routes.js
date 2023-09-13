const routes = require("next-routes")();

routes.add("pokemon", "/pokemon/details/:name", "pokemon");

module.exports = routes;
