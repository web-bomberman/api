import app from './app';

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV || 'production';

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}, ${ENV} environment.`);
});