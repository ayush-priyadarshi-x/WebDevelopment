const person = require("./database/models/person");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
passport.use(
  new localStrategy(async (username, password, done) => {
    //Authentication Logic
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
      return done(error);
    }
  })
);
module.exports = passport;
