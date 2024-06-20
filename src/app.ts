// src/app.ts
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

const dbFilePath = path.join(__dirname, 'db.json');

// Ensure db.json exists and has an initial value
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify({ submissions: [] }));
}

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const newSubmission = { name, email, phone, github_link, stopwatch_time };

  // Read current submissions
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  dbData.submissions.push(newSubmission);

  // Write updated submissions to file
  fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));

  res.json({ success: true, submission: newSubmission });
});

app.get('/read', (req: Request, res: Response) => {
  const index = Number(req.query.index);

  // Read current submissions
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

  if (index >= 0 && index < dbData.submissions.length) {
    res.json({ success: true, submission: dbData.submissions[index] });
  } else {
    res.status(404).json({ success: false, message: 'Submission not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
