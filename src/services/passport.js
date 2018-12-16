const passport = require("passport");
const User = require("../models").User;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const secret = require("../../config/secret");

// Create local strategy
const localOptions = { usernameField: "username", failureFlash: true };
const localLogin = new LocalStrategy(localOptions, async function(
  username,
  password,
  done
) {
  try {
    const user = await User.findOne({
      where: { email: { [Op.eq]: username.trim() } }
    });

    if (!user) {
      return done(null, false);
    }
    if (!user.validPassword(password)) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret.JWT_SECRET
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
  try {
    const user = await User.findByPk(payload.sub);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
