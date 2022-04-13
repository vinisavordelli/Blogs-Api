const express = require('express');
const bodyParser = require('body-parser');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');
const UserRoutes = require('./Routes/UserRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/user', UserRoutes.UserRoutes);
app.use(ErrorMiddleware);
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
