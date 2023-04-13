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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const express_validator_1 = require("express-validator");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = yield Task_1.default.findAll({ where: { user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        res.json(tasks);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    try {
        const newTask = new Task_1.default({
            name,
            description,
            user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
        });
        yield newTask.save();
        res.json(newTask);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const taskId = req.params.id;
    const { title, description } = req.body;
    try {
        const task = yield Task_1.default.findOne({ where: { id: taskId, user_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id } });
        if (!task) {
            return res.status(404).json({ errors: [{ msg: 'Task not found' }] });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        yield task.save();
        res.json(task);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    try {
        const task = yield Task_1.default.findOne({ where: { id, user_id: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id } });
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        yield task.destroy();
        res.json({ msg: 'Task deleted' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map