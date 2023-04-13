"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Todo extends sequelize_1.Model {
}
Todo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(256),
        allowNull: true,
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'todos',
    sequelize: database_1.default,
});
exports.default = Todo;
//# sourceMappingURL=Todo.js.map