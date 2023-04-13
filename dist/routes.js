"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
const express_validator_1 = require("express-validator");
const authController_1 = require("./controllers/authController");
const forgotPasswordController_1 = require("./controllers/forgotPasswordController");
const resetPasswordController_1 = require("./controllers/resetPasswordController");
const taskController_1 = require("./controllers/taskController");
const router = express_1.default.Router();
exports.router = router;
router.post('/register', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), authController_1.register);
router.get('/tasks', authenticate_1.default, (req, res) => {
    // Handle the request for the /tasks route for authenticated users
    // Authentication routes
    router.post('/login', authController_1.login);
    router.post('/logout', authenticate_1.default, authController_1.logout);
    router.post('/forgot-password', forgotPasswordController_1.forgotPassword);
    router.post('/reset-password', resetPasswordController_1.resetPassword);
    // Task routes
    router.post('/tasks', authenticate_1.default, taskController_1.createTask);
    router.get('/tasks', authenticate_1.default, taskController_1.getTasks);
    router.patch('/tasks/:id', authenticate_1.default, taskController_1.updateTask);
    router.delete('/tasks/:id', authenticate_1.default, taskController_1.deleteTask);
});
//# sourceMappingURL=routes.js.map