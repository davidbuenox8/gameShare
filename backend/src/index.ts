import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import mongoose, { Error } from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import { UserInterface } from './Interfaces/UserInterface';
import User from './User';

const localStrategy = passportLocal.Strategy;

mongoose.connect(
  'mongodb+srv://Davidx8:Patiment88@cluster0.gzlzd.mongodb.net/gameShare?retryWrites=true&w=majority',
  // no longer needed :{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  (err: Error) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);

//Middlewares
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Passport
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: Error, user: any) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err: Error, result: any) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser((user: any, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: any) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin,
    };
    cb(err, userInformation);
  });
});

//Routes
app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    res.send('Improper Values');
    return;
  }

  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err;
    if (doc) res.send('User already exists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('Success');
    }
  });
});

app.post(
  '/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.send('Successfully Authenticated');
  }
);

app.get('/user', (req: Request, res: Response) => {
  res.send('req.user');
});

app.listen(4000, () => {
  console.log('Server Started');
});
