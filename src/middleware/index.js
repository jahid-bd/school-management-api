const express = require('express');
const swagarUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swagarDoc = YAML.load('./swagger.yaml');
const morgan = require('morgan');
const cors = require('cors');
const OpenApiValidator = require('express-openapi-validator');

const applyMiddleware = (app) => {
  app.use(express.json());

  app.use(morgan('dev'));
  app.use(cors());

  app.use('/docs', swagarUI.serve, swagarUI.setup(swagarDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: 'swagger.yaml',
    })
  );
};

module.exports = applyMiddleware;
