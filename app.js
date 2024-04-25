const express = require('express');
const { swaggerDocs } = require('./routers/swagger');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi/swagger.yaml');

const app = express();
const port = 3000;

app.use(express.json());

const taskRoutes = require('./routers/index');
app.use('/api/v1', taskRoutes);

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Corriendo en el puerto: ${port}`);
  swaggerDocs(app, port);
});
