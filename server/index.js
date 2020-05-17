
// Importar express
const express = require("express");
const cors = require("cors");

// Inicializar la librería
const app = express();
app.use(express.json());
app.use(cors());
// VERSION del api
const vs = "/api/v1/";

const route_users = require("./routes/users");
const route_modules = require("./routes/modules");
const route_roles = require("./routes/roles");
const route_options = require("./routes/options");
const route_mail = require("./routes/sendEmail");
const route_actions = require("./routes/actions");
const route_login = require("./routes/authentication");
const route_noPass = require("./routes/noPass");
const route_citys = require("./routes/citys");

app.use(vs, route_noPass);
app.use(vs, route_citys);
app.use(vs, route_mail);
app.use(vs, route_login);
app.use(vs, route_users);
app.use(vs, route_modules);
app.use(vs, route_roles);
app.use(vs, route_options);
app.use(vs, route_actions);

app.use('/', (req, res) => {
  res.status(404).send({
    ok: false, message: 'El recurso que busca no existe'
  })
});

// Puerto
const port = 8000;
app.listen(port, () => {
  console.log(`Escuchando API en http://localhost:${port}/api/v1/`);
});

