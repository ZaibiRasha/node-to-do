"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const authenticate_1 = __importDefault(require("./authenticate"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SESSION_SECRET } = process.env;
const app = (0, express_1.default)();
// Configure express-session middleware
app.use((0, express_session_1.default)({
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
// Your route handlers and other middleware
app.get('/', authenticate_1.default, (req, res) => {
    // This route is protected by the authenticate middleware
    // Only authenticated users can access this route
    const user = req.session.user;
    res.send(`Hello, authenticated user ${user.username}!`);
});
app.get('/login', (req, res) => {
    // Render the login page
    res.render('login');
});
app.post('/login', (req, res) => {
    // Authenticate the user and set the session data
    const user = (0, authenticate_1.default)(req.body.username, req.body.password);
    if (user) {
        req.session.user = user;
        res.redirect('/');
    }
    else {
        res.render('login', { error: 'Invalid username or password' });
    }
});
app.get('/logout', (req, res) => {
    // Clear the session data and redirect to the login page
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});
exports.default = app;
//# sourceMappingURL=authenticate.js.map