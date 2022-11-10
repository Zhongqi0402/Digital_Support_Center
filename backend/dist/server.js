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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sync_1 = require("csv-parse/sync");
const database_1 = __importDefault(require("./database"));
const UserModel_1 = __importDefault(require("./routes/userRoute/UserModel"));
const ProductModel_1 = __importDefault(require("./routes/ticketRoute/ProductModel"));
const TicketModel_1 = __importDefault(require("./routes/ticketRoute/TicketModel"));
const NoteModel_1 = __importDefault(require("./routes/noteRoute/NoteModel"));
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
app.use('/api/tickets', require('./routes/ticketRoute/ticketRoute'));
app.use('/api/admin', require('./routes/userRoute/adminRoute'));
// ----------------------------------------------
// preprocess csv files
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync();
        const isInit = (yield UserModel_1.default.findByPk(1)) ? true : false;
        if (!isInit) {
            // users.csv
            const csvFilePath = path.resolve(__dirname, '..', 'users.csv');
            const headers = ['id', 'name', 'email', 'password', 'isAdmin'];
            const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
            let userData = (0, sync_1.parse)(fileContent, {
                delimiter: ',',
                columns: headers,
            });
            const salt = yield bcryptjs_1.default.genSalt(10);
            userData = yield Promise.all(userData.map((row) => __awaiter(void 0, void 0, void 0, function* () {
                const hashedPassword = yield bcryptjs_1.default.hash(row.password, salt);
                return Object.assign(Object.assign({}, row), { id: parseInt(row.id), isAdmin: Boolean(row.isAdmin == 1), password: hashedPassword });
            })));
            // console.log(userData)
            yield UserModel_1.default.bulkCreate(userData);
            // products.csv
            const productFilePath = path.resolve(__dirname, '..', 'products.csv');
            const productHeaders = ['id', 'manufacturer', 'type', 'colour'];
            const productContent = fs.readFileSync(productFilePath, {
                encoding: 'utf-8',
            });
            let productData = (0, sync_1.parse)(productContent, {
                delimiter: ',',
                columns: productHeaders,
            });
            productData = productData.map((row) => {
                return Object.assign(Object.assign({}, row), { id: parseInt(row.id) });
            });
            // console.log(productData)
            yield ProductModel_1.default.bulkCreate(productData);
            // tickets.csv
            const ticketsFilePath = path.resolve(__dirname, '..', 'tickets.csv');
            const ticketsHeaders = [
                'id',
                'userID',
                'productID',
                'description',
                'status',
            ];
            const ticketsContent = fs.readFileSync(ticketsFilePath, {
                encoding: 'utf-8',
            });
            let ticketsData = (0, sync_1.parse)(ticketsContent, {
                delimiter: ',',
                columns: ticketsHeaders,
            });
            ticketsData = ticketsData.map((row) => {
                return Object.assign(Object.assign({}, row), { id: parseInt(row.id), userID: parseInt(row.userID), productID: parseInt(row.productID) });
            });
            // console.log(ticketsData)
            yield TicketModel_1.default.bulkCreate(ticketsData);
            const notesFilePath = path.resolve(__dirname, '..', 'notes.csv');
            const notesHeaders = ['id', 'ticketID', 'text', 'isStaff'];
            const notesContent = fs.readFileSync(notesFilePath, {
                encoding: 'utf-8',
            });
            let notesData = (0, sync_1.parse)(notesContent, {
                delimiter: ',',
                columns: notesHeaders,
            });
            notesData = notesData.map((row) => {
                return Object.assign(Object.assign({}, row), { id: parseInt(row.id), ticketID: parseInt(row.ticketID), isStaff: Boolean(row.isStaff == 1) });
            });
            yield NoteModel_1.default.bulkCreate(notesData);
        }
        UserModel_1.default.hasMany(TicketModel_1.default, { foreignKey: 'userID' });
        TicketModel_1.default.belongsTo(UserModel_1.default, { foreignKey: 'userID' });
        ProductModel_1.default.hasMany(TicketModel_1.default, { foreignKey: 'productID' });
        TicketModel_1.default.belongsTo(ProductModel_1.default, { foreignKey: 'productID' });
        TicketModel_1.default.hasMany(NoteModel_1.default, { foreignKey: 'ticketID' });
        NoteModel_1.default.belongsTo(TicketModel_1.default, { foreignKey: 'ticketID' });
        const server = app.listen(port);
        const io = require('./socket').init(server);
        io.on('connection', () => {
            console.log('Client connected');
        });
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    }
    catch (error) {
        console.log(error);
    }
});
runDB();
