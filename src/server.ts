import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import AuthRoute from './routes/auth.route';
import validateEnv from './utils/validateEnv';
import MessageRoute from './routes/message.route';

validateEnv();

const app = new App([new IndexRoute(), new MessageRoute(), new AuthRoute()]);

app.listen();
