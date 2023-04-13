"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const crypto_1 = __importDefault(require("crypto"));
class User extends sequelize_1.Model {
    generateResetToken() {
        const resetToken = crypto_1.default.randomBytes(20).toString('hex');
        this.resetToken = resetToken;
        this.resetTokenExpiresAt = new Date(Date.now() + 3600000); // expires in 1 hour
        return resetToken;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    resetTokenExpiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users',
    sequelize: database_1.default,
});
exports.default = User;
//# sourceMappingURL=User.js.map