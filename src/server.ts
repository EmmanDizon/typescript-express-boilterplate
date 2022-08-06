import "dotenv/config";
import "module-alias/register";
import App from "./app";
import controllers from "./controllers/index";

const port: number = Number(process.env.PORT) || 3001;

const app = new App(controllers, port);

app.listen();
