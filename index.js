const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const taskRoutes = require("./routes/task").router;
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome!!!" });
});

mongoose
  .connect("mongodb+srv://davidsds:CZXFMh2JvNGa6nw5@tde01.dxckzef.mongodb.net/tasks?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
