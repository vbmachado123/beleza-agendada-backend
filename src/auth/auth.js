const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserController = require('../controllers/UserController');
const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req , email, password, done) => {
        try {
   
          const user = await User.findOne({
            where: { 
              email : email
            }
          });

         
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await UserController.isValidPassword(user , password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req , email, password, done) => {
        try {

          const userFromDB = await User.findOne({
            where: { 
              email : email
            }
          });

          if (userFromDB) {
            return done(null, false, { message: 'User already exists' });
          }

          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt , null );

          const { name, phone , birthday , gender , photourl } = req.body;
          const user = await UserController.store({  name, phone , email , password : hash , birthday , gender , photourl});
    
          return done(null, user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );

module.exports = {

     async login(req, res, next) {

        await  passport.authenticate(
            'login',
            async (err, user, info) => {

              try {
                
                if (err || !user) {
                  const error = new Error(info.message);
      
                  return next(error);
                }

                req.login(
                  user,
                  { session: false },
                  async (error) => {
                    if (error) return next(error);
      
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, 'TOP_SECRET');
      
                    return res.json({ token });
                  }
                );
              } catch (error) {
                return next(error);
              }
            }
          )(req, res, next);

    },


    async signup(req, res, next) {

      await  passport.authenticate(
        'signup', { session: false },
        async (err, user, info) => {
       
          try {

            if (err || !user) {
              const error = new Error(info.message);
  
              return next(error);
            }
        

            res.json({
              message: 'Signup successful',
              user: req.user
            });
            
          } catch (error) {
            return next(error);
          }

        }
      )(req, res, next);

   
  
    }

};