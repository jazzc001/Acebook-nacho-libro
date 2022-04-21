const bcrypt = require("bcrypt");
const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const plainTextPassword = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.redirect("/sessions/new");
      } else {
        const hashedPassword = user.password;
        bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
          if (result) {
            req.session.message = {
              type: "success",
              message: "Successfully logged in!",
            };
            req.session.user = user;
            res.redirect("/posts");
          } else {
            console.log(err);
            req.session.message = {
              type: "danger",
              message:
                "Unsuccessful login! Please check your email or password.",
            };
            res.redirect("/sessions/new");
            // console.log("Unsuccessful login!");
          }
        });
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    //    req.session.message = {
    //   type: "success",
    //   message: "Successfully logged out!",
    // };
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
