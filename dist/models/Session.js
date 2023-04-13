"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Session extends sequelize_1.Model {
}
Session.init({
    sid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    expires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    data: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'sessions',
    sequelize: database_1.default,
});
exports.default = Session;
//# sourceMappingURL=Session.js.map