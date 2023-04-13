"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const User_1 = __importDefault(require("../models/User"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetToken, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { resetToken } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid reset token' });
        }
        const now = Date.now();
        if (now > user.resetTokenExpiresAt.getTime()) {
            return res.status(400).json({ message: 'Reset token has expired' });
        }
        user.password = password;
        user.resetToken = null;
        user.resetTokenExpiresAt = null;
        yield user.save();
        return res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=resetPasswordController.js.map