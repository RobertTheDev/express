import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());

class User {
  name: string;
  email: string;
  password: string;
}

declare module "express-session" {
  interface SessionData {
    user: User | null;
  }
}

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    name: "heyy",
    cookie: { secure: false },
  })
);

app.get("/hello", (req, res) => {
  req.session.user = { name: "Darren", email: "", password: "" };
  res.json({ m: "hello" });
});

app.get("/user", (req, res) => {
  const { user } = req.session;
  res.json(user);
});

app.get("/logout", function (req, res, next) {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.send(err);
    });
  });
});

app.listen(3000, () => {
  console.log("App is listening on 3000.");
});
