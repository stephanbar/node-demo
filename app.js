const express = require('express');
const fs = require('fs');
const path = require('path'); // <--- New module to help with file paths
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// --- 1. SERVE THE HTML FILE ---
app.get('/', (req, res) => {
  // __dirname is a magic variable that means "the folder this code is in"
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 2. HANDLE THE DATA (Same as before) ---
app.post('/api/user', (req, res) => {
  const data = req.body;
  const logEntry = `User: ${data.name}, Role: ${data.role} (Saved at ${new Date().toLocaleTimeString()})\n`;

  fs.appendFile('users.txt', logEntry, (err) => {
    if (err) return res.status(500).send("Error");
    console.log("New user saved:", data.name);
    res.json({ status: "Saved Successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});