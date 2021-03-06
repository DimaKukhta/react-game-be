import * as express from 'express';
import * as logger from 'morgan';
import playersRouter from './routes/players';
import * as cors from 'cors';

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', playersRouter);

app.use(function(req, res, next) {
  res.json({
    statusCode: 404
  });
});

app.use(function(err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack
  });
});

export default app;
