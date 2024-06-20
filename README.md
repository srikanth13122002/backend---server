the instructions provided cover the essential steps for setting up, running, and testing the backend server. Here is a consolidated and formatted README that you can use for your GitHub repository:

 Backend Server

This is a simple backend server built with Express and TypeScript, using a JSON file as a database to store submissions.

 Getting Started

These instructions will guide you through setting up and running the backend server locally.

 Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **TypeScript** (installed globally)

 Installation

1. Clone the Repository:

   ```bash
   git clone https://github.com/your-username/backend-server.git
   cd backend-server
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

 Configuration

1. Create a TypeScript Configuration File:

   Ensure you have a `tsconfig.json` file in the root of your project with the following content:

   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true
     },
     "include": ["src/**/*"]
   }
   ```

2. Create the Source Directory and Initial File:

   Ensure you have a `src` directory with an `app.ts` file:

   ```bash
   mkdir src
   touch src/app.ts
   ```

   Add the following code to `src/app.ts`:

   ```typescript
   import express, { Request, Response } from 'express';
   import fs from 'fs';

   const app = express();
   const PORT = 3000;
   const DB_FILE = './db.json';

   app.use(express.json());

   app.get('/ping', (req: Request, res: Response) => {
     res.json({ success: true });
   });

   app.post('/submit', (req: Request, res: Response) => {
     const { name, email, phone, github_link, stopwatch_time } = req.body;
     const submissions = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) || [];
     submissions.push(req.body);
     fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
     res.json({ success: true, submission: req.body });
   });

   app.get('/read', (req: Request, res: Response) => {
     const index = Number(req.query.index);
     const submissions = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) || [];
     const submission = submissions[index] || null;
     res.json({ success: true, submission });
   });

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

 Running the Server

1. Compile the TypeScript Code:

   ```bash
   npx tsc --project tsconfig.json
   ```

2. Start the Server:

   ```bash
   npm start
   ```

   Or, if you have `nodemon` installed:

   ```bash
   npm run dev
   ```

 Testing the Endpoints

You can use tools like Postman or curl to test the endpoints.

1. Ping the Server:

   ```bash
   curl http://localhost:3000/ping-UseBasicParsing
   ```

2. Submit a New Submission:

   ```bash
   curl -X POST http://localhost:3000/submit -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "phone": "1234567890", "github_link": "https://github.com/johndoe", "stopwatch_time": "00:05:23"}'-UseBasicParsing
   ```

3. Read a Submission by Index:

   ```bash
   curl http://localhost:3000/read?index=0-UseBasicParsing
   ```

 Note

- Ensure the server is running on `http://localhost:3000`.
- Make sure you have a `db.json` file in the root directory for storing the submissions.
