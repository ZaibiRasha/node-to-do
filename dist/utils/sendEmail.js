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
exports.sendResetPasswordEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { EMAIL_USER, EMAIL_PASS } = process.env;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});
const sendResetPasswordEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Reset Password Link',
        text: `Click on the link below to reset your password:\n\nhttp://localhost:3000/reset-password?token=${resetToken}`,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=sendEmail.js.map