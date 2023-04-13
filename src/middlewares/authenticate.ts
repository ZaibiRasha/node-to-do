import express, { NextFunction } from 'express';
import session, { Session, SessionData } from 'express-session';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const { SESSION_SECRET } = process.env;

interface MySession extends SessionData {
  user?: any;
}

const authApp  = express();

// Configure express-session middleware
authApp .use(
  session({
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
function authenticate(req: Request, res: Response, next: NextFunction) {
  const user = (req.session as MySession).user;
  if (!user) {
    return res.status(401).json({ message: 'You must be logged in to access this resource.' });
  }
  next();
}

// Your route handlers and other middleware
authApp .get('/', authenticate, (req: Request, res: Response) => {
  // This route is protected by the authenticate middleware
  // Only authenticated users can access this route
  const user = (req.session as MySession).user;
  res.send(`Hello, authenticated user ${user.username}!`);
});

authApp .get('/login', (req: Request, res: Response) => {
  // Render the login page
  res.render('login');
});

authApp.post('/login', authenticate, (req: Request, res: Response, next: NextFunction) => {
  // Authenticate the user and set the session data
  const user = authenticate(req.body.username, req.body.password, next);

  if (user) {
    (req.session as MySession).user = user;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});


authApp .get('/logout', (req: Request, res: Response) => {
  // Clear the session data and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});


export default authApp ;
