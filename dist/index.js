"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Endpoint to ping the server
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Endpoint to submit a form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Here you would typically save the submission to a database or JSON file
    // For now, just send back the submitted data
    res.json({ success: true, submission: req.body });
});
// Endpoint to read a form submission by index
app.get('/read', (req, res) => {
    const index = Number(req.query.index); // Convert index from query string to a number
    // Here you would retrieve the submission data based on the index
    // For demonstration purposes, return a placeholder response
    res.json({ success: true, submission: `Submission ${index + 1}` });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
