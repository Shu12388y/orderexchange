import dotenv from "dotenv";
dotenv.config({
    path:'.env'
})

import { app } from "./server";
import { DB } from "./utils/db";


DB()
  .then(() => {
    app.listen(process.env.PORT || 3003, () => {
      console.log("server is on");
    });
  })
  .catch((e) => {
    console.log("error", e);
  });
