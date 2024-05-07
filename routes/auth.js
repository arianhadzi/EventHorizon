import { Router } from "express";
const router = Router();
import * as users from "../data/users.js";
import { validateUsername, validatePassword, validateEmail } from "../validation.js";
import { ObjectId } from "mongodb";
import xss from "xss";


router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/home", (req, res) => {
  return res.render("home");
});

router
  .route("/register")
  .get(async (req, res) => {
    res.render("register", { title: "Register" });
  })
  .post(async (req, res) => {
    // checking if firstname is supplied

    if (!req.body.firstName) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Error: firstName is missing",
      });
    }
    // checking if lastname is supplied
    if (!req.body.lastName) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Error: lastName is missing",
      });
    }
    // checking if username is supplied
    if (!req.body.username) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Error: username is missing",
      });
    }
    // checking if email is given
    if (!req.body.email) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Error: email is missing",
      });
    }
    // checking if password is supplied
    if (!req.body.password) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Error: password is missing",
      });
    }

    let username = xss(req.body.username);
    let password = xss(req.body.password);
    // input validation
    username = validateUsername(username);
    password = validatePassword(password);

    try {
      let newUser = await users.registerUser(
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.password
      );
      if (newUser.signupCompleted) {
        return res.redirect("/login");
      } else {
        return res.status(500).render("register", {
          title: "Register",
          error: "Error: Internal Server Error",
        });
      }
    } catch (e) {
      return res.status(400).render("register", {
        title: "Register",
        error: e,
      });
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    return res.render("login", { title: "Login" });
  })
  .post(async (req, res) => {
    if (!req.body.username) {
      return res.status(400).render("login", {
        title: "Login",
        error: "Error: username should be supplied.",
      });
    }
    if (!req.body.password) {
      return res.status(400).render("login", {
        title: "Login",
        error: "Error: password should be supplied.",
      });
    }
    let username = xss(req.body.username);
    let password = xss(req.body.password);
    username = validateUsername(username);
    password = validatePassword(password);

    try {
      let login = await users.loginUser(username, password);
      req.session.user = login;
      req.session.loggedIn = true;
    } catch (e) {
      return res.status(400).render("login", {
        title: "Login",
        error: e,
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  res.render("logout");
});

router.route("/user").get(async (req, res) => {
  try {
    if (req.session.user) {
      return res.render("user", {
        firstName: req.session.firstName,
        lastName: req.session.user.lastName,
        currentTime: new Date().toLocaleTimeString(),
      });
    }
  } catch (e) {
    res.render("login");
  }
});

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.render("logout", { title: "Logout" });
});
router.route("/create-event").get(async (req, res) => {
  res.render("create_event");
});

router.route("/verify-organizer").get(async (req, res) => {
  res.render("verify_organizer", {
    // organizationName: req.session.organizationName,
  });
});

router.route("/search").get(async (req, res) => {
  res.render("search", {});
});

router.route("/calendar").get(async (req, res) => {
  res.render("calendar", {});
});

router.route("/bookmarks").get(async (req, res) => {
  res.render("bookmarks", {});
});

router.get("/home", (req, res) => {
  res.render("home", req.session.loggedIn);
});

router.get("/event", (req, res) => {
  res.render("event", {});
});

router.get("/", (req, res) => {
  res.render("home", req.session.loggedIn);
});

export default router;
