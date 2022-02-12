const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const Connection = require("./Configuration/connection").DbConnection
const Axios = require("axios")
const PORT = 5000;
dotenv.config();

//database connection
Connection();

app.use(express.json());
app.use(cors());

//routes

const user = require("./Routes/login");

// const people = require("./Routes/people")

//app.use
app.use("/",user);
// app.use("/",people)
app.use("/people", function(req,res){
  const data = Axios.get('https://swapi.dev/api/people')
  .then(response => {
    return response.json();
  })
  .catch(error => {
    return error ;
  });
  res.send(data)
})

app.use("/planet", function(req,res){
  const data = Axios.get('https://swapi.dev/api/planets')
  .then(response => {
  console.log(response)
  })
  .catch(error => {
    return error ;
  });
  res.send(data)
})





app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server connect on PORT ======>  ${PORT}`);
});

module.exports = app;