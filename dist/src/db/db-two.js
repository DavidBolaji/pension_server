"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const globalPrisma = global;
exports.db = globalPrisma.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalPrisma.prisma = exports.db;
exports.default = exports.db;
//# sourceMappingURL=db-two.js.map