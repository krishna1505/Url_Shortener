import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import flash from "connect-flash";
import requestIp from "request-ip";
import session from "express-session";

import { authRoutes } from "./routes/auth.routes.js";
import { verifyAuthentication } from "./middlewares/verify-auth-middleware.js";
import { shortenerRoutes } from "./routes/shortener.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Body parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", "./views")

// app.use(cookieParser());

// app.use(
//   session({ secret: "my-secret", resave: true, saveUninitialized: false })
// );
app.use(cookieParser());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(flash());
app.use(flash());

app.use(requestIp.mw());

// This must be after cookieParser middleware.
// app.use(verifyAuthentication);

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   return next();
// });

app.use(verifyAuthentication);

app.use((req, res, next) => {
  res.locals.user = req.user;

  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");

  next();
});

// app.get("/", (req, res) => {
//   res.send("Server Running Successfully");
// });


// app.get("/", (req, res) => {
//   res.render("index", {
//     user: null,
//     errors: [],
//     links: [],
//     host: "http://localhost:3000",
//     currentPage: 1,
//     totalPages: 1,
//   });
// });

// How It Works:
// This middleware runs on every request before reaching the route handlers.
//? res.locals is an object that persists throughout the request-response cycle.
//? If req.user exists (typically from authentication, like Passport.js), it's stored in res.locals.user.
//? Views (like EJS, Pug, or Handlebars) can directly access user without manually passing it in every route.

// express router
// app.use(router);
// app.use(authRoutes);
// app.use(shortenerRoutes);
app.use("/auth", authRoutes);
app.use("/", shortenerRoutes);
// app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
