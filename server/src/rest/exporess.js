const express = require('express');
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.get("/", (request, response) => {
  response.send({ message: "Hello from an Express API!" });
});
 
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

module.exports = app