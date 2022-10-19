"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv_parse_1 = require("csv-parse");
const database_1 = __importDefault(require("./database"));
const UserModel_1 = __importDefault(require("./routes/userRoute/UserModel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = 50000;
// routes
// Dummy request
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use('/api/users', require('./routes/userRoute/userRoute'));
const csvFilePath = path.resolve(__dirname, 'users.csv');
const headers = ['id', 'name', 'email', 'password', 'isAdmin'];
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync();
        const isInit = (yield UserModel_1.default.findByPk(1)) ? true : false;
        if (!isInit) {
            // await User.create({
            //   name: 'Andrew Soft',
            //   email: 'andrewSoft@soft.com',
            //   password: 'abcde',
            // })
            let userData;
            (0, csv_parse_1.parse)(fileContent, {
                delimiter: ',',
                columns: headers,
            }, (error, result) => {
                if (error) {
                    // console.error(error)
                }
                console.log('Result', result);
                userData = result;
            });
            yield UserModel_1.default.create(userData);
            // await Product.create()
            // await Ticket.create()
        }
        app.listen(port);
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    }
    catch (error) {
        console.log(error);
    }
});
runDB();
