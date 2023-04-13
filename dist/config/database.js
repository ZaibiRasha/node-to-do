"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// database.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const { dialect, host, username, password, database } = config_1.default.db;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    dialect,
    host,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map