/*====================================Importing Dependencies===================================*/
const user = require("./Database/Models/user");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
/*==================================End Importing Dependencies=================================*/

/*==========================================Actual Code========================================*/
passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await person.findOne({ name: username });
      if (!user) {
        return done(null, false, { message: "The name doesn't exit" });
      } else {
        const isPasswordMatch = await user.correctPassword(password);
        if (isPasswordMatch) {
          done(null, user);
        } else {
          return done(null, false, { message: "The name doesn't exit" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Invalid Token");
    }
  })
);
/*=========================================End Actual Code=====================================*/


/*============================================Exporting========================================*/
module.exports = passport;
/*==========================================End Exporting======================================*/