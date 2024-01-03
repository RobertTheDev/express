import express from "express";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.json({ m: "hello" });
});

app.listen(3000, () => {
  console.log("App is listening on 3000.");
});
