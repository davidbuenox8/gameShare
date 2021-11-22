import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import mongoose, { Error } from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import {
  UserInterface,
  GameInterface,
  DatabaseUserInterface,
} from './Interfaces/Interfaces';
import User from './User';
import axios from 'axios';

dotenv.config();

const localStrategy = passportLocal.Strategy;
const mongoURL = process.env.MONGOURL;
mongoose.connect(`${mongoURL}`, (err: Error) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

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
  new localStrategy((username: string, password: string, done) => {
    User.findOne(
      { username: username },
      (err: Error, user: DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(
          password,
          user.password,
          (err: Error, result: boolean) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        );
      }
    );
  })
);

passport.serializeUser((user: DatabaseUserInterface, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };
    cb(err, userInformation);
  });
});

/* //gameSpot API
axios
  .get(
    'http://www.gamespot.com/api/articles/?api_key=b69d7a7293b14019dad38aa97dd962e98cfb3e08'
  )
  .then((res) => res.data)
  .then((data) => console.log(data)); */

//Routes
app.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof email !== 'string'
  ) {
    res.send('Improper Values');
    return;
  }

  User.findOne({ username }, async (err: Error, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) res.send('User already exists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('success');
    }
  });
});

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { user }: any = req;
  if (user) {
    User.findOne(
      { username: user.username },
      (err: Error, doc: DatabaseUserInterface) => {
        if (err) throw err;
        if (doc?.isAdmin) {
          next();
        } else {
          res.send('Sorry, only admins can perform this.');
        }
      }
    );
  } else {
    res.send(`Sorry, you aren't logged in`);
  }
};

app.post(
  '/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.send('success');
  }
);

app.get('/user', (req: Request, res: Response) => {
  res.send(req.user);
});

app.get('/logout', function (req, res) {
  req.logout();
  res.send('Success');
});
app.post('/deleteUser', isAdminMiddleware, (req, res) => {
  const { id } = req.body;
  User.findByIdAndDelete(id)
    .then((deleted) => {
      res.send('success');
    })
    .catch((err) => console.log(err));
});

app.get('/getallusers', isAdminMiddleware, (req: Request, res: Response) => {
  User.find({})
    .then((data: any) => {
      const filteredData: UserInterface[] = [];
      data.forEach((item: DatabaseUserInterface) => {
        const userInformation: UserInterface = {
          id: item._id,
          username: item.username,
          email: item.email,
          isAdmin: item.isAdmin,
        };
        filteredData.push(userInformation);
      });
      console.log(filteredData);
      res.send(filteredData);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(4000, () => {
  console.log('Server Started');
});
