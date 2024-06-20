"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
const dbFilePath = path_1.default.join(__dirname, 'db.json');
// Ensure db.json exists and has an initial value
if (!fs_1.default.existsSync(dbFilePath)) {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify({ submissions: [] }));
}
app.use(express_1.default.json());
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    // Read current submissions
    const dbData = JSON.parse(fs_1.default.readFileSync(dbFilePath, 'utf-8'));
    dbData.submissions.push(newSubmission);
    // Write updated submissions to file
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));
    res.json({ success: true, submission: newSubmission });
});
app.get('/read', (req, res) => {
    const index = Number(req.query.index);
    // Read current submissions
    const dbData = JSON.parse(fs_1.default.readFileSync(dbFilePath, 'utf-8'));
    if (index >= 0 && index < dbData.submissions.length) {
        res.json({ success: true, submission: dbData.submissions[index] });
    }
    else {
        res.status(404).json({ success: false, message: 'Submission not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
