import express from "express";
import { routes } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log("HTTP Server running!");
});
