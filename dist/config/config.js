"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    db: {
        host: process.env.DB_HOST ? process.env.DB_HOST : "",
        database: process.env.DB_NAME ? process.env.DB_NAME : "",
        username: process.env.DB_USER ? process.env.DB_USER : "",
        password: process.env.DB_PASS ? process.env.DB_PASS : "",
        dialect: 'mysql',
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map