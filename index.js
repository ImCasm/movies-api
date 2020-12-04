const express = require('express');
const app = express();
const { config } = require('./config/index');
const { moviesApi } = require('./routes/movies');
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');
const cors = require('cors');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());
app.use(cors());

moviesApi(app);
app.use(notFoundHandler);
// Error Middlewares
app.use(wrapErrors);
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}`);
});
