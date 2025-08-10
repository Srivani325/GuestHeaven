const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controllers/users.js");



// SIGNUP

router.route("/signup")
      .get( UserController.renderSignupForm)
      .post( WrapAsync(UserController.signup))


// LOGIN

router.route("/login")
      .get( UserController.renderLoginForm )
      .post( saveRedirectUrl,
             passport.authenticate("local",  { failureRedirect: '/login' , failureFlash : true} ),
             WrapAsync( UserController.login));
    

// LOGOUT

router.get("/logout" , UserController.logout);

module.exports = router;