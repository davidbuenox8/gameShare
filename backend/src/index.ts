import mongoose, { Error } from 'mongoose';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

mongoose.connect(
  'mongodb+srv://Davidx8:Patiment88@cluster0.gzlzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  // no longer needed :{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  (err: Error) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);
