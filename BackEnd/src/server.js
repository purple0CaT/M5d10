import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3003;
// server.use();
server.listen(port, () => {
  console.log(port);
});
console.table(listEndpoints(server));
